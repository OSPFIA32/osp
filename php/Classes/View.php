<?php
class View {
  // Pfad zum Template
  private $path = 'templates';
  // Name des Templates, in dem Fall das Standardtemplate.
  private $template = 'application';

  /**
   * Enthält die Variablen, die in das Template eingebetet
   * werden sollen.
   */
  private $_ = array();

  /**
   * Assigns model variables to the template
   *
   * @param String $key Schlüssel
   * @param String $value Variable
   */
  public function assign($key, $value){
    $this->_[$key] = $value;
  }


  /**
   * Setzt den Namen des Templates.
   *
   * @param String $template Name des Templates.
   */
  public function setTemplate($template = 'default') {
    $this->template = $template;
  }

  /**
   * Das Template-File laden und zurückgeben
   *
   * @param string $tpl Der Name des Template-Files (falls es nicht vorher
   *                      über steTemplate() zugewiesen wurde).
   * @return string Der Output des Templates.
   */
  public function loadTemplate() {
    $tpl = $this->template;
    // Pfad zum Template erstellen & überprüfen ob das Template existiert.
    $file = $this->path . DIRECTORY_SEPARATOR . $tpl . '.php';
    $exists = file_exists($file);

    if ($exists) {

        ob_start();
        include $file;
        $output = ob_get_contents();
        ob_end_clean();
        return $output;
      }
      else {

        // Template-File existiert nicht-> Fehlermeldung.
        return 'could not find template';
      }
  }
}
?>
