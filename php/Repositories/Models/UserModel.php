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
  public $username;

  /**
  * stores users LDAP-accessToken
  *
  */
  public $accessToken;

  public function __construct($id) {
    $this->id = (int)$id;
    $this->username = 'fia32hurensohn';
    $this->accessToken = "bbe2f892a19bc957fickdich";
  }

  public function toArray() {
    $array = array();
    $array['user'] = array();
    foreach($this as $key => $value) {
      $array['user'][$key] = $value;
    }
    return $array;
  }
}

?>
