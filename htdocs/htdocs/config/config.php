<?php
declare(strict_types=1);

/**
 * NeuroWays – zentrale Anwendungskonfiguration
 *
 * Speicherort:
 * htdocs/config/config.php
 *
 * Diese Datei enthält sensible Zugangsdaten.
 * Sie darf niemals in ein öffentliches Repository gelangen.
 */

$htdocsPath = dirname(__DIR__);

return [

    /*
    |--------------------------------------------------------------------------
    | Datenbank
    |--------------------------------------------------------------------------
    */

    'database' => [
        'driver'   => 'mysql',
        'host'     => 'database-5021022338.webspace-host.com',
        'port'     => 3306,
        'name'     => 'dbs15945095',
        'user'     => 'dbu683992',
        'password' => 'bernow-waNber-vagfe2',
        'charset'  => 'utf8mb4',

        /*
         * PDO-Einstellungen
         */
        'options' => [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Anwendung
    |--------------------------------------------------------------------------
    */

    'application' => [
        'name'        => 'NeuroWays',
        'environment' => 'development', // development | test | production
        'debug'       => true,
        'timezone'    => 'Europe/Berlin',

        /*
         * Öffentliche Basisadresse ohne abschließenden Schrägstrich.
         *
         * Beispiel:
         * https://deine-domain.de
         */
        'base_url' => 'https://DEINE-DOMAIN.DE',

        /*
         * Hauptpfade der Anwendungen.
         */
        'applications' => [
            'neuroquest' => '/neuroquest/app',
            'neuroplay'  => '/neuroplay/app',
            'neuroways'  => '/neuroways/app',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Sicherheit und Sitzungen
    |--------------------------------------------------------------------------
    */

    'security' => [
        'session_name' => 'NEUROWAYS_SESSION',

        /*
         * In einer produktiven HTTPS-Umgebung auf true lassen.
         */
        'session_cookie_secure' => true,

        /*
         * Verhindert, dass JavaScript auf das Session-Cookie zugreift.
         */
        'session_cookie_httponly' => true,

        /*
         * Geeigneter Standard für normale Anmeldesitzungen.
         */
        'session_cookie_samesite' => 'Lax',

        /*
         * 0 bedeutet: Sitzung endet beim Schließen des Browsers.
         */
        'session_lifetime' => 0,

        /*
         * Schutz gegen Cross-Site-Request-Forgery.
         */
        'csrf_enabled' => true,

        /*
         * Länge neu erzeugter CSRF-Tokens in Bytes.
         */
        'csrf_token_length' => 32,

        /*
         * Passwort-Hashing für spätere Benutzerkonten.
         */
        'password_algorithm' => PASSWORD_DEFAULT,
    ],

    /*
    |--------------------------------------------------------------------------
    | Dateisystem
    |--------------------------------------------------------------------------
    */

    'paths' => [
        'htdocs' => $htdocsPath,

        /*
         * Gemeinsamer Speicherbereich.
         */
        'storage' => $htdocsPath . '/storage',

        /*
         * Nicht öffentlich auslieferbare Anwendungsdaten.
         */
        'private' => $htdocsPath . '/storage/private',

        /*
         * Protokolldateien.
         */
        'logs' => $htdocsPath . '/storage/logs',

        /*
         * Temporäre Dateien.
         */
        'temp' => $htdocsPath . '/storage/temp',

        /*
         * Öffentliche Uploads wie freigegebene Bilder.
         */
        'public_uploads' => $htdocsPath . '/uploads',

        /*
         * NeuroQuest-spezifische Pfade.
         */
        'neuroquest' => [
            'root'       => $htdocsPath . '/neuroquest',
            'app'        => $htdocsPath . '/neuroquest/app',
            'assets'     => $htdocsPath . '/neuroquest/app/assets',
            'private'    => $htdocsPath . '/storage/private/neuroquest',
            'uploads'    => $htdocsPath . '/uploads/neuroquest',
            'story_data' => $htdocsPath . '/storage/private/neuroquest/stories',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Protokollierung
    |--------------------------------------------------------------------------
    */

    'logging' => [
        'enabled' => true,

        /*
         * debug | info | warning | error
         */
        'level' => 'debug',

        'file' => $htdocsPath . '/storage/logs/neuroways.log',

        /*
         * Technische Fehlermeldungen niemals direkt im Kinderbereich anzeigen.
         */
        'display_errors' => false,
    ],

    /*
    |--------------------------------------------------------------------------
    | NeuroQuest
    |--------------------------------------------------------------------------
    */

    'neuroquest' => [
        /*
         * true:
         * Startseite verwendet Demo-Daten.
         *
         * false:
         * Startseite verwendet MariaDB.
         */
        'demo_mode' => true,

        /*
         * Anzahl der Runden pro Tagesmission.
         */
        'rounds_per_day' => 5,

        /*
         * Anzahl der Arbeitsschritte pro Satz.
         */
        'steps_per_sentence' => 5,

        /*
         * Standardbegleiter, falls noch keiner zugeordnet wurde.
         */
        'default_companion' => 'Luna',

        /*
         * Standardwerte, falls keine spezielle Szene gefunden wurde.
         */
        'fallback_scene' => [
            'scene_type'       => 'NEUTRAL_START',
            'location_code'    => 'FOREST_EDGE',
            'location_name'    => 'am Waldrand',
            'illustration_key' => 'neutral-start',
            'ambience_key'     => 'calm',
        ],
    ],

];