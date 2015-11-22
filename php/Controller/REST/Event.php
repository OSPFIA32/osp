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


    if($this->request['type'] === 'GET') {
      if (empty($request['query'])) {
        //$events = EventRepository::findAll();
      } elseif (!empty($request['query']['id'])) {
        //$events = EventRepository::find($request['query']['id']);
      } else {
        //$events = EventRepository::query($request['query']);
      }
    } elseif ($this->request['type'] === 'POST') {
      print_r($request);
      $data = json_decode($this->request['data']['data']);
      $res = EventRepository::create($data);
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
    $this->view->assign('outlet', '\n');

    return $this->view->loadTemplate();
  }
}

?>
