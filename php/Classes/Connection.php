<?php

 class Connection {
   /**
    * instance
    *
    * Statische Variable, um die aktuelle (einzige!) Instanz dieser Klasse zu halten
    *
    * @var Singleton
    */
   protected static $_instance = null;

   protected static $_connection;

   /**
    * get instance
    *
    * Falls die einzige Instanz noch nicht existiert, erstelle sie
    * Gebe die einzige Instanz dann zurück
    *
    * @return   Singleton
    */
   public static function getInstance()
   {
       if (null === self::$_instance)
       {
           self::$_instance = new self;
       }
       return self::$_connection;
   }

   /**
    * clone
    *
    * Kopieren der Instanz von aussen ebenfalls verbieten
    */
   protected function __clone() {}


   /**
    * constructor
    *
    * externe Instanzierung verbieten
    */
   protected function __construct() {
     self::$_connection = new PDO(MYSQL_HOST, MYSQL_USER, MYSQL_PASS);
   }
 }

?>
