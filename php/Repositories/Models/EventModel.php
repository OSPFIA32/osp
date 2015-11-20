<?php

class EventModel {

  /**
  * @property $id
  * stores users id (LDAP)
  */
  public $id;

  /**
  * @property $eventName
  * stores the users full name
  */
  public $eventName;

  /**
  * @property $startDate
  * stores the events start date
  */
  public $startDate;

  /**
  * @property $endDate
  * stores the events end date
  */
  public $endDate;

  public function __construct($id) {
    $this->id = (int)$id;
    $this->eventName = 'Deutschunterricht';
    $this->startDate = '26.10.2015 07:45:00';
    $this->endDate = '26.10.2015 09:15:00';
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
