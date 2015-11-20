<?php
class ControllerRESTUser {

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
   * @return String Content der Applikation.
   */
  public function display() {
    $user = UserRepository::find($this->request['id']);

    if($user !== null) {
      $res = $user->toArray();
      $res['status'] = 'success';
    } else {
      $res = array('status' => 'error');
    }
    $this->view->setTemplate($this->template);
    $this->view->assign('outlet', json_encode($res));

    return $this->view->loadTemplate();
  }
}

?>
