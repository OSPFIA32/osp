<?php
class ControllerRESTEvent {

  private $request = null;
  private $template = '';
  private $view = null;
  /**
   * Konstruktor, erstellet den Controller.
   *
   * @param Array $request Array aus $_GET & $_POST.
   */
  public function __construct($request) {
    $this->view = new View();
    $this->request = $request;
    $this->template = 'JSON';
  }

  /**
   * Methode zum anzeigen des Contents.
   *
   * @return string string to display
   */
  public function display() {

    //Decide what to do / CREATE / UPDATE / DELETE / GET
    if($this->request['type'] === 'GET') {
      if (empty($request['query'])) {
        $res = EventRepository::findAll();
      } elseif (!empty($request['query']['id'])) {
        //$events = EventRepository::find($request['query']['id']);
      } else {
        //$events = EventRepository::query($request['query']);
      }


      if($res !== null) {
        if(!is_array($res))
          $res = array(0 => $res);
        for($i = 0, $length = count($res); $i < $length; $i++) {
          $events[$i] = $res[$i]->toArray();
        }

        $return['events'] = array_values($events);
        $return['status'] = 'success';

        $return = json_encode($return);
      } else {
        $return = array('status' => 'error');
      }




    } elseif ($this->request['type'] === 'POST') {
      $data = ($this->request['data']);
      $res = EventRepository::create($data);

      if($res !== 200) {
        $return = array('status' => 'error');
      }
      else {
        $return = array('status' => 'success');
      }
      $return = json_encode($return);
      echo($return);
    }
    /*
    if($event !== null) {

      $events = array();
      for($i = 0; $i < 3; $i++) {
        array_push($events, $event->toArray());
      }

      $res['events'] = array_values($events);
      $res['status'] = 'success';
    } else {
      $res = array('status' => 'error');
    }
    */
    $this->view->setTemplate($this->template);
    $this->view->assign('outlet', $return);

    return $this->view->loadTemplate();
  }
}

?>
