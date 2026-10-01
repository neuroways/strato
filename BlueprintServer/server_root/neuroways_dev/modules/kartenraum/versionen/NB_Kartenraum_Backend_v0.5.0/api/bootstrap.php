<?php
declare(strict_types=1);

use NeuroWays\NeuroBalance\Kartenraum\Application\CardService;
use NeuroWays\NeuroBalance\Kartenraum\Infrastructure\CentralDatabaseConfig;
use NeuroWays\NeuroBalance\Kartenraum\Infrastructure\DatabaseConnectionSelector;
use NeuroWays\NeuroBalance\Kartenraum\Infrastructure\Db;
use NeuroWays\NeuroBalance\Kartenraum\Infrastructure\MariaDbCardRepository;
use NeuroWays\NeuroBalance\Kartenraum\Infrastructure\Auth;
use NeuroWays\NeuroBalance\Kartenraum\Application\JournalService;

spl_autoload_register(function(string $class): void {
    $prefix='NeuroWays\\NeuroBalance\\Kartenraum\\';
    if (!str_starts_with($class,$prefix)) return;
    $parts=explode('\\',substr($class,strlen($prefix)));
    $layer=strtolower(array_shift($parts));
    $path=__DIR__.'/../backend/'.$layer.'/'.implode('/',$parts).'.php';
    if (is_file($path)) require_once $path;
});

function json_response(array $payload,int $status=200): never {
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($payload,JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES|JSON_PRETTY_PRINT);
    exit;
}

try {
    $databases=CentralDatabaseConfig::load();
    // Only the central connection key lives in the module; never credentials.
    $connectionKey='platform';
    $pdo=Db::connect(DatabaseConnectionSelector::select($databases,$connectionKey));
    $service=new CardService(new MariaDbCardRepository($pdo));
    $auth=new Auth($pdo);
    $journalService=new JournalService($pdo);
} catch (Throwable $e) {
    json_response(['status'=>'error','error'=>'DATABASE_BOOTSTRAP_FAILED','message'=>$e->getMessage()],503);
}

function request_json(): array {
    $raw=file_get_contents('php://input');
    if ($raw===false || trim($raw)==='') return [];
    $data=json_decode($raw,true);
    return is_array($data)?$data:[];
}

function bearer_token(): string {
    $header=$_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (preg_match('/^Bearer\s+(.+)$/i',$header,$m)) return trim($m[1]);
    return '';
}
