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
    // GET
    if($this->request['type'] === 'GET') {
      if (empty($this->request['query'])) {
        $res = EventRepository::findAll();
      } elseif (!empty($this->request['query']['id'])) {
        $res = EventRepository::find($this->request['query']['id']);
      } else {
        $events = EventRepository::query($request['query']);
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
    // POST
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

    $this->view->setTemplate($this->template);
    $this->view->assign('outlet', $return);

    return $this->view->loadTemplate();
  }
}

?>
