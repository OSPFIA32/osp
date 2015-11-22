<?php

class EventModel {

  /**
  * @property $id
  * stores users id (LDAP)
  */
  public $id;

  /**
  * @property $userID
  * stores the creators userid
  */
  public $userID;

  /**
  * @property $eventName
  * stores the users full name
  */
  public $name;

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

  /**
  * @property $description
  * stores a description of the event which will be shown in the event page
  */
  public $description;


  public function __construct() {}

  public function toArray() {
    $array = array();
    foreach($this as $key => $value) {
      $array[$key] = preg_match('/\d+/', $value) ? (int)$value : $value;
    }
    return $array;
  }

  public function __set($prop, $val) {
    unset($prop);
    unset($val);
  }


}

?>
