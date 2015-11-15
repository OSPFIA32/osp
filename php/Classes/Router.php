<?php
/**
* class Router
* Emuliert Routen durch /GET index.php?route=:route
*/

class Router {

  public static function getController($request) {

    // Default Route, if no route specified

    if(!isset($request['route'])) {

      return new Controller($request);
    }
    else {

      // Emulated routes
      switch($request['route']) {
        case 'events':
          return new ControllerEvents($request);
        case 'login':
          return new ControllerLogin($request);
        default:
          return new ControllerDefault($request);
      }
    }
  }
}

?>
