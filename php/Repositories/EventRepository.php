<?php
/**
 * Repository - Füllt das Model application-user
 */
require_once 'Models/EventModel.php';
class EventRepository {

  /**
   * Gibt alle Einträge des Blogs zurück.
   * testing
   * @return EventModel[]   $event
   */
  public static function findAll() {

    $connection = Connection::getInstance();
    if(!$connection)
      return null;

    $stmt = $connection->prepare('
      SELECT  *
      FROM    events
    ');

    $stmt->execute();
    $stmt->setFetchMode(PDO::FETCH_CLASS, 'EventModel');

    if($event = $stmt->fetchAll())
      return $event;
    return null;
  }

  /**
   * Gibt einen bestimmten Eintrag zurück.
   * done
   * @param   int         $id     Id des gesuchten Eintrags
   * @return  EventModel  $event  User mit id = $id
   */
  public static function find($id) {

    $connection = Connection::getInstance();
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

    $connection = Connection::getInstance();

    if(!$connection)
      return null;

    $stmt = $connection->prepare('
      INSERT INTO `events`  (`name`, `description`, `userID` ,`startDate`, `endDate`)
      VALUES                (:name , :description ,  69,      :startDate , :endDate )
    ');

    $stmt->bindParam(':name', $data['name']);
    $stmt->bindParam(':description', $data['description']);
    $stmt->bindParam(':startDate', $data['startDate']);
    $stmt->bindParam(':endDate', $data['endDate']);

    if($stmt->execute() === true) {
      return 200;
    }
    else {

      return $stmt->errorCode();
    }
  }

  /**
  *
  *
  */
  public static function query($query) {
    $connection = Connection::getInstance();

    $dateflag = false;
    $usernameflag = false;
    $nameflag = false;

    if(!$connection)
      return null;

    $where = '';
    if ($query['startDate']) {
      $dateflag = true;
      $where = 'startDate >= :startDate AND startDate < date_add(day,1,:startDate)';
    }
    if ($query['username']) {
      $usernameflag = true;

      //Get Userid from LDAP

      //Dummy
      $userid = 69;
      if(!empty($where)) {
        $where .= ' AND';
      }
      $where .= ' userID = :userid';
    }
    if ($query['name']) {
      $nameflag = true;
      if(!empty($where)) {
        $where .= ' AND';
      }
      $where .= ' name LIKE :name';
    }
    $query = '
      SELECT  *
      FROM    events
      WHERE   ' . $where;

    $stmt = $connection->prepare($query);

    if($dateflag)
      $stmt->bindParam(':startDate', $query['startDate']);
    if($userid)
      $stmt->bindParam(':userid', $query[$userid]);
    if($nameflag)
      $stmt->bindParam(':name', $query['name']);

    $stmt->execute();
    $stmt->setFetchMode(PDO::FETCH_CLASS, 'EventModel');

    if($event = $stmt->fetch())
      return $event;
    return null;

  }

}
?>
