<?php

class EventModel {

  /**
  * stores users id (LDAP)
  *
  */
  public $id;

  /**
  * stores the users full name
  *
  */
  public $eventName;


  public function __construct($id) {
    $this->id = (int)$id;
    $this->eventName = 'Das ist ein Event';
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
