<?php
/**
* class Router
* Emuliert Routen durch /GET index.php?route=:route
*/

class Router {

  public static function getController($request) {
    // Default Route, if no route specified
    if(!isset($request['route'])) {
      return new ControllerLogin($request);
    }
    else {
      // Emulated routes
      switch($request['route']) {
        case 'events':
          return new ControllerEvents($request);
        case 'login':
          return new ControllerLogin($request);
        case 'api':
          return self::getRESTController($request);
        default:
          return new ControllerDefault($request);
      }
    }
  }

  protected static function getRESTController($request) {

    // Evaluate parameters from path
    if($request['type'] == 'GET')
      $request['query'] = self::evalPath($request['path']);
    switch($request['path'][1]) {
      case 'users':
        return new ControllerRESTUser($request);
      case 'events':
        return new ControllerRESTEvent($request);
    }
  }

  /**
  * evaluates the path into query parameters
  * @param  $path   string[]   contains the splitted path
  * @return $query  string[]   evaluated parameters
  */
  protected static function evalPath($path) {

    $query = array();
    for($i = 2, $length = count($path); $i + 1 < $length; $i += 2) {
      $query[$path[$i]] = $path[$i+1];
    }
    return $query;
  }
}

?>
