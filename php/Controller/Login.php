<?php
class ControllerLogin {

  private $request = null;
  private $template = '';
  private $view = null;
  private $user = null;
  /**
   * Konstruktor, erstellet den Controller.
   *
   * @param Array $request Array aus $_GET & $_POST.
   */
  public function __construct($request) {
    $this->view = new View();
    $this->request = $request;
    $this->template = 'Login';
  }

  /**
   * Methode zum anzeigen des Contents.
   *
   * @return String Content der Applikation.
   */
  public function display() {
    $innerView = new View();
    $this->view->setTemplate($this->template);
    $this->view->assign('title', 'Lerhmittelverwaltung');
    return $this->view->loadTemplate();
  }
}

?>
