<?php

class UserModel {

  /**
  * stores users id (LDAP)
  *
  */
  public $id;

  /**
  * stores the users full name
  *
  */
  public $name;


  public function __construct() {

  }

  public function toArray() {
    $array = array();
    $array['user'] = array();
    foreach($this as $key => $value) {
      $array['user'][$key] = $value;
    }
    return $array;
  }

  public function __set($prop, $val) {
    unset($prop);
    unset($val);
  }
}

?>
