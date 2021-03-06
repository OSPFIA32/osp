<?php
/**
 * Repository - Füllt das Model application-user
 */
require_once 'Models/ReservationModel.php';
class ReservationRepository {

  /**
   * Gibt alle Einträge des Blogs zurück.
   *
   * @return Array Array von Usern
   */
  public static function findAll(){

    $connection = Connection::getInstance();
    if(!$connection)
      return null;
    else {
      $stmt = $connection->prepare('
        SELECT  *
        FROM    users
      ');
      $stmt->execute();
    }
    return null;
  }

  /**
   * Gibt einen bestimmten Eintrag zurück.
   *
   * @param   int       $id     Id des gesuchten Eintrags
   * @return  UserModel $user   User mit id = $id
   */
  public static function find($id) {

    $connection = Connection::getInstance();
    if(!$connection)
      return null;

    $stmt = $connection->prepare('
      SELECT  *
      FROM    user
      WHERE   id = :id
    ');
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    $stmt->setFetchMode(PDO::FETCH_CLASS, 'UserModel');

    if($user = $stmt->fetch())
      return $user;
    return null;
  }

  /**
  * creates Database Entry for User
  *
  * @param  array    $data
  */
  public static function create($data) {

    $connection = Connection::getInstance();
    if(!$connection)
      return null;

    $stmt = $connection->prepare('
      INSERT INTO `user`  (`id`, `name`, `group`)
      VALUES              (:id , :name , :group )
    ');

    $stmt->bindParam(':id', $data['id']);
    $stmt->bindParam(':name', $data['name']);

    if($stmt->execute() === true)
      return 200;
    else {
      return $stmt->errorCode();
    }
  }

  public function update($data) {

    $connection = Connection::getInstance();
    if(!$connection)
      return null;

    $stmt = $connection->prepare('
      UPDATE `user`
      SET
          `id` = :id,
          `name` = :name,
          `group` = :group
    ');

    $stmt->bindParam(':id', $data['id']);
    $stmt->bindParam(':name', $data['name']);
    $stmt->bindParam(':group', $data['group']);

    if($stmt->execute() === true)
      return 200;
    else {
      return $stmt->errorCode();
    }
  }

}
?>
