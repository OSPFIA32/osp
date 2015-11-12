<?php
class ControllerApplication {

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
    $this->template = 'default';
    if($logged)
      $this->user = ModelApplicationUserRepository::find($_SESSION['id']);
  }

  /**
   * Methode zum anzeigen des Contents.
   *
   * @return String Content der Applikation.
   */
  public function display() {
    $innerView = new View();

    $this->view->setTemplate('application');
    $this->view->assign('title', 'Der Titel');

    //Templates für später
    $this->view->assign('outlet-header', $headerView->loadTemplate());
    $this->view->assign('outlet-menu', $menuView->loadTemplate());
    $this->view->assign('outlet-content', $innerView->loadTemplate());

    return $this->view->loadTemplate();
  }
}

?>
