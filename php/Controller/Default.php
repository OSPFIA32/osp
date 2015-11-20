<?php
class ControllerDefault {

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
    $this->template = '404';
  }

  /**
   * Methode zum anzeigen des Contents.
   *
   * @return String Content der Applikation.
   */
  public function display() {
    $innerView = new View();
    $this->view->setTemplate($this->template);
    $this->view->assign('title', 'Error 404');
    return $this->view->loadTemplate();
  }
}

?>
