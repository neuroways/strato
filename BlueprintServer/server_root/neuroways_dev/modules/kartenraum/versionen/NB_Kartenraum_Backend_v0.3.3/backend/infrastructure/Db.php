<?php
declare(strict_types=1);
namespace NeuroWays\NeuroBalance\Kartenraum\Infrastructure;
use PDO;
use RuntimeException;

final class Db {
    public static function connect(array $c): PDO {
        foreach (['host','database','username'] as $key) {
            if (empty($c[$key])) throw new RuntimeException('Incomplete DB connection: '.$key);
        }
        $driver=$c['driver'] ?? 'mysql';
        $port=$c['port'] ?? '3306';
        $charset=$c['charset'] ?? 'utf8mb4';
        $dsn=sprintf('%s:host=%s;port=%s;dbname=%s;charset=%s',
            $driver,$c['host'],$port,$c['database'],$charset);
        return new PDO($dsn,$c['username'],$c['password'] ?? '',[
            PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES=>false
        ]);
    }
}
