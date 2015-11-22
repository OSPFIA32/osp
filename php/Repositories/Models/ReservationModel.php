<?php

class ReservationModel {

  /**
  * @property $id
  * stores reservation id
  */
  public $id;

  /**
  * @property $eventID
  * stores the event id
  */
  public $eventID;

  /**
  * @property $equipementID
  * stores users id (LDAP)
  */
  public $equipementID;

  public function __construct($id) {
    $this->id = (int)$id;
    $this->eventID = 'Deutschunterricht';
    $this->equipementID = 1;
  }

  public function toArray() {
    $array = array();
    foreach($this as $key => $value) {
      $array[$key] = $value;
    }
    return $array;
  }
}

?>
