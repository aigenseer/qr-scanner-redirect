<?php
/**
 * Coded By : aigenseer
 * Copyright 2019, https://github.com/aigenseer
 */
class QSR_Tabs
{

  private $tabs;
  private $title;
  private $page;

  /**
   * [__construct description]
   * @param string $page  [url string of tab]
   * @param string $title [title for the header]
   * @param array  $tabs  [list of tabs]
   */
  function __construct(string $page, string $title, array $tabs)
  {
    $this->page = $page;
    $this->title = $title;
    $this->tabs = $tabs;
  }

  /**
   * [deliver the active tab from the url. if no tab was found on the url then return the first entry of the tabs]
   * @return String
   */
  private function getActiveTab()
  {
    $active_tab = isset($_GET['tab'])? $_GET[ 'tab' ]: "";
    $found = '';
    foreach ($this->tabs as $id => $tab) {
      if($active_tab == $id){
        $found = $id;
      }
    }
    if(strlen($found)==0){
      $found = array_keys($this->tabs)[0];
    }
    return $found;
  }

  /**
   * [deliver html string of a elements]
   * @param  String $active_tab [set on elmenent to active]
   * @return String
   */
  private function getHTMLTabs($active_tab)
  {
    $html = '';
    foreach ($this->tabs as $id => $tab) {
      $html .= '<a href="?page='.$this->page.'&tab='.$id.'" class="nav-tab '.($active_tab == $id ? 'nav-tab-active' : '').'">'.$tab->title.'</a>';
    }
    return $html;
  }

  /**
   * [print the html code]
   */
  public function display()
  {
    $active_tab = $this->getActiveTab();
    $tabs = $this->getHTMLTabs($active_tab);
    print <<<HTML
        <div class="wrap">
            <h2>$this->title</h2>
            <!-- <div class="description">This is description of the page.</div> -->
            <h2 class="nav-tab-wrapper">
              $tabs
            </h2>
        </div>
HTML;
    include QSR_PLUGIN_FILE_URL."/include/settings.php";
  }

  public function addScripts()
  {
    add_action('admin_enqueue_scripts', function(){
      wp_enqueue_script( 'pluginsettingsform-script', plugins_url( '../assets/pluginsettingsform/pluginsettingsform.js', __FILE__ ), [], false, true);
    });
    add_action('admin_init', function (){
      wp_enqueue_style( 'pluginsettingsform-style', plugins_url( '../assets/pluginsettingsform/pluginsettingsform.css', __FILE__ ));
    });
  }

}

?>
