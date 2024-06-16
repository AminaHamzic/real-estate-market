<?php

// Set the reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL ^ (E_NOTICE | E_DEPRECATED));

class Config {
    public static function DB_NAME() {
        return Config::get_env("DB_NAME", "defaultdb");
    }
    public static function DB_PORT() {
        return Config::get_env("DB_PORT", 25060);
    }
    public static function DB_USER() {
        return Config::get_env("DB_USER", 'doadmin');
    }
    public static function DB_PASSWORD() {
        return Config::get_env("DB_PASSWORD", 'AVNS_8HJSPnNJl0k-LPm60Ab');
    }
    public static function DB_HOST() {
        return Config::get_env("DB_HOST", 'db-mysql-fra1-13103-do-user-16943550-0.c.db.ondigitalocean.com');
    }
    public static function JWT_SECRET() {
        return Config::get_env("JWT_SECRET", 'Mirza');
    }
    public static function get_env($name, $default){
        return isset($_ENV[$name]) && trim($_ENV[$name]) != "" ? $_ENV[$name] : $default;
    }
}


// Database access credentials
//define('DB_NAME', 'webprojetc');
//define('DB_PORT', 3306);
//define('DB_USER', 'root');
//define('DB_PASSWORD', 'bajramovic123');
//define('DB_HOST', '127.0.0.1'); // localhost

// JWT SECRET 
//define ('JWT_SECRET','Mirza'); 