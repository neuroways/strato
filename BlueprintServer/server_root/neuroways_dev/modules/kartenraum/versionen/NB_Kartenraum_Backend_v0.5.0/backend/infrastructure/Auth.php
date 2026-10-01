<?php
declare(strict_types=1);

namespace NeuroWays\NeuroBalance\Kartenraum\Infrastructure;

use PDO;
use RuntimeException;

final class Auth
{
    public function __construct(private PDO $pdo) {}

    public static function normalizeUsername(string $username): string
    {
        $username = trim($username);
        $username = preg_replace('/\s+/u', ' ', $username) ?? $username;
        return mb_strtolower($username, 'UTF-8');
    }

    public static function generateAccessCode(): string
    {
        $alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        $parts = [];
        for ($p = 0; $p < 2; $p++) {
            $part = '';
            for ($i = 0; $i < 4; $i++) {
                $part .= $alphabet[random_int(0, strlen($alphabet)-1)];
            }
            $parts[] = $part;
        }
        return implode('-', $parts);
    }

    public function createProfile(string $username, string $audience, string $language='de'): array
    {
        $username = trim($username);
        $normalized = self::normalizeUsername($username);

        if (mb_strlen($username) < 2 || mb_strlen($username) > 64) {
            throw new RuntimeException('USERNAME_INVALID');
        }
        if (!in_array($audience, ['ADULT','CHILD'], true)) {
            throw new RuntimeException('AUDIENCE_INVALID');
        }

        $check = $this->pdo->prepare("SELECT 1 FROM nb_user_profile WHERE username_normalized=:u LIMIT 1");
        $check->execute(['u'=>$normalized]);
        if ($check->fetchColumn()) {
            throw new RuntimeException('USERNAME_UNAVAILABLE');
        }

        $code = self::generateAccessCode();
        $hash = password_hash($code, PASSWORD_DEFAULT);

        $stmt = $this->pdo->prepare(
            "INSERT INTO nb_user_profile
             (username,username_normalized,access_code_hash,audience_code,language_code)
             VALUES (:username,:normalized,:hash,:audience,:language)"
        );
        $stmt->execute([
            'username'=>$username,'normalized'=>$normalized,'hash'=>$hash,
            'audience'=>$audience,'language'=>$language
        ]);

        $profileId = (int)$this->pdo->lastInsertId();
        $session = $this->createSession($profileId);

        return [
            'profile_id'=>$profileId,
            'username'=>$username,
            'access_code'=>$code,
            'audience_code'=>$audience,
            'language_code'=>$language,
            'session_token'=>$session['token'],
            'session_expires_at'=>$session['expires_at'],
        ];
    }

    public function login(string $username, string $code, string $ip): array
    {
        $normalized = self::normalizeUsername($username);
        $ipHash = hash('sha256', $ip);

        $rate = $this->pdo->prepare(
            "SELECT COUNT(*) FROM nb_login_attempt
             WHERE (username_normalized=:u OR ip_hash=:ip)
               AND attempted_at >= (NOW() - INTERVAL 15 MINUTE)
               AND success_flag=0"
        );
        $rate->execute(['u'=>$normalized,'ip'=>$ipHash]);
        if ((int)$rate->fetchColumn() >= 10) {
            throw new RuntimeException('TOO_MANY_ATTEMPTS');
        }

        $stmt = $this->pdo->prepare(
            "SELECT profile_id,username,access_code_hash,audience_code,language_code,status_code
             FROM nb_user_profile WHERE username_normalized=:u LIMIT 1"
        );
        $stmt->execute(['u'=>$normalized]);
        $profile = $stmt->fetch();

        $ok = $profile && $profile['status_code']==='active'
            && password_verify(strtoupper(trim($code)), $profile['access_code_hash']);

        $log = $this->pdo->prepare(
            "INSERT INTO nb_login_attempt(username_normalized,ip_hash,success_flag)
             VALUES (:u,:ip,:ok)"
        );
        $log->execute(['u'=>$normalized,'ip'=>$ipHash,'ok'=>$ok?1:0]);

        if (!$ok) {
            throw new RuntimeException('LOGIN_FAILED');
        }

        $this->pdo->prepare(
            "UPDATE nb_user_profile SET last_access_at=CURRENT_TIMESTAMP WHERE profile_id=:id"
        )->execute(['id'=>$profile['profile_id']]);

        $session = $this->createSession((int)$profile['profile_id']);

        return [
            'profile_id'=>(int)$profile['profile_id'],
            'username'=>$profile['username'],
            'audience_code'=>$profile['audience_code'],
            'language_code'=>$profile['language_code'],
            'session_token'=>$session['token'],
            'session_expires_at'=>$session['expires_at'],
        ];
    }

    private function createSession(int $profileId): array
    {
        $token = bin2hex(random_bytes(32));
        $tokenHash = hash('sha256', $token);
        $expires = (new \DateTimeImmutable('+30 days'))->format('Y-m-d H:i:s');

        $stmt = $this->pdo->prepare(
            "INSERT INTO nb_user_session(profile_id,token_hash,expires_at)
             VALUES (:profile,:hash,:expires)"
        );
        $stmt->execute(['profile'=>$profileId,'hash'=>$tokenHash,'expires'=>$expires]);

        return ['token'=>$token,'expires_at'=>$expires];
    }

    public function requireSession(string $token): array
    {
        if ($token === '') throw new RuntimeException('AUTH_REQUIRED');

        $hash = hash('sha256', $token);
        $stmt = $this->pdo->prepare(
            "SELECT s.session_id,p.profile_id,p.username,p.audience_code,p.language_code
             FROM nb_user_session s
             JOIN nb_user_profile p ON p.profile_id=s.profile_id
             WHERE s.token_hash=:hash
               AND s.revoked_at IS NULL
               AND s.expires_at > NOW()
               AND p.status_code='active'
             LIMIT 1"
        );
        $stmt->execute(['hash'=>$hash]);
        $row = $stmt->fetch();
        if (!$row) throw new RuntimeException('AUTH_REQUIRED');

        $this->pdo->prepare(
            "UPDATE nb_user_session SET last_seen_at=CURRENT_TIMESTAMP WHERE session_id=:id"
        )->execute(['id'=>$row['session_id']]);

        return $row;
    }
}
