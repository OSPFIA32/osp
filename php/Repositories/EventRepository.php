<?php
/**
 * Repository - Füllt das Model application-user
 */
require_once 'Models/EventModel.php';
class EventRepository {

    /**
     * Gibt alle Einträge des Blogs zurück.
     *
     * @return Array Array von Usern
     */
    public static function findAll() {

    }

    /**
     * Gibt einen bestimmten Eintrag zurück.
     *
     * @param int $id Id des gesuchten Eintrags
     * @return Array Array, dass einen Eintrag repräsentiert, bzw.
     *                  wenn dieser nicht vorhanden ist, null.
     */
    public static function find($id) {

      $event = new EventModel($id);

      if(true)
        return $event;
      else {
        return null;
      }

      /*
        $connection = PDOConnection::getInstance();
        if(!$connection)
          return null;

        $stmt = $connection->prepare('
          SELECT  *
          FROM    user
          WHERE   id = :id
        ');
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $stmt->setFetchMode(PDO::FETCH_CLASS, 'ModelApplicationUser');

        if($user = $stmt->fetch())
          return $user;
        return null;
      */
    }

    /**
    * creates Database Entry for User
    *
    */
    public static function create($data) {

        $connection = PDOConnection::getInstance();
        if(!$connection)
          return null;
        else {
          $stmt = $connection->prepare('
            INSERT INTO `user`  (`id`, `accessToken`, `name`)
            VALUES            (:id,   :accessToken,  :name)
          ');

          $stmt->bindParam(':id', $data['id']);
          $stmt->bindParam(':accessToken', $data['accessToken']);
          $stmt->bindParam(':name', $data['name']);

          if($stmt->execute() === true)
            return 200;
          else {
            return $stmt->errorCode();
          }
        }
    }
}
?>
