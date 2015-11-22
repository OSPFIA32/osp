<?php
/**
 * Repository - Füllt das Model application-user
 */
require_once 'Models/EventModel.php';
class EventRepository {

  /**
   * Gibt alle Einträge des Blogs zurück.
   *
   * @return EventModel[]   $event
   */
  public static function findAll() {
    $connection = PDOConnection::getInstance();
    if(!$connection)
      return null;

    $stmt = $connection->prepare('
      SELECT  *
      FROM    events
    ');

    $stmt->bindParam(':id', $id);
    $stmt->execute();
    $stmt->setFetchMode(PDO::FETCH_CLASS, 'EventModel');

    if($event = $stmt->fetch())
      return $event;
    return null;
  }

  /**
   * Gibt einen bestimmten Eintrag zurück.
   *
   * @param   int         $id     Id des gesuchten Eintrags
   * @return  EventModel  $event  User mit id = $id
   */
  public static function find($id) {

    $connection = PDOConnection::getInstance();
    if(!$connection)
      return null;

    $stmt = $connection->prepare('
      SELECT  *
      FROM    events
      WHERE   id = :id
    ');

    $stmt->bindParam(':id', $id);
    $stmt->execute();
    $stmt->setFetchMode(PDO::FETCH_CLASS, 'EventModel');

    if($event = $stmt->fetch())
      return $event;
    return null;
  }

  /**
  * creates Database Entry for Events
  */
  public static function create($data) {

    $connection = PDOConnection::getInstance();
    if(!$connection)
      return null;

    $stmt = $connection->prepare('
      INSERT INTO `events`  (`name`, `description`, `userId`, `startDate`, `endDate`)
      VALUES                (:name , :description , :userId , :startDate , :endDate )
    ');

    $stmt->bindParam(':name', $data['name']);
    $stmt->bindParam(':description', $data['description']);
    //$stmt->bindParam(':image', $data['image']);
    $stmt->bindParam(':startDate', $data['startDate']);
    $stmt->bindParam(':endDate', $data['endDate']);

    if($stmt->execute() === true)
      return 200;
    else {
      return $stmt->errorCode();
    }
  }
}
?>
