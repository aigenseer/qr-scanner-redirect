<?php
/**
 * Coded By : aigenseer
 * Copyright 2019, https://github.com/aigenseer
 */
class QSR_PluginSettings {

    private $DEFAULT_VALUES;
    private $DEFAULT_GROUP;
    private $tablename;
    private $wpdb;

    /**
     * [__construct]
     * @param string   $tablename
     * @param stdClass $default_values   [default data settings from values]
     * @param string   $defaul_groupname [default value of group name]
     */
    function __construct(string $tablename, stdClass $default_values, $defaul_groupname='general')
    {
      global $wpdb;
      $this->wpdb = $wpdb;
      $this->tablename = $this->wpdb->prefix.$tablename.'_settings';
      $this->DEFAULT_GROUP = $defaul_groupname;
      $this->DEFAULT_VALUES = $default_values;
    }

    /**
     * [create the table "$this->tablename"]
     */
    public function createTable()
    {
      $charset_collate = $this->wpdb->get_charset_collate();
      $sql = "CREATE TABLE $this->tablename (
        `id` INT(11) NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(25) NOT NULL,
        `data` TEXT NOT NULL ,
        `group` VARCHAR(25) NOT NULL ,
        `timestamp` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
         PRIMARY KEY (`id`)
       ) $charset_collate";
      require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
      dbDelta( $sql );
    }

    /**
     * [return the boolean if the entry value exist]
     * @param  string  $name [name of value]
     * @return boolean
     */
    public function is($name='')
    {
      $str = "SELECT COUNT(`id`) as count FROM `%s` WHERE `name` like '%s'";
      $sql = sprintf($str, $this->tablename, $name);
      return intval($this->wpdb->get_var($sql))>0;
    }

    /**
     * [create the entry of settings value. if they exist, then will be updated]
     * @param string $name  [name of value]
     * @param string|integer|boolean|double $data [value of setting]
     * @param string $group [name of settings group]
     */
    public function set(string $name, $data, string $group = null)
    {
      if($group===null){
        $group = $this->DEFAULT_GROUP;
      }
      if(!$this->is($name)){
        $str = "INSERT INTO `%s` (`name`, `data`, `group`) values('%s', '%s', '%s') ";
        $sql = sprintf($str, $this->tablename, $name, $data, $group);
        $this->wpdb->query($sql);
      }else{
        $this->update($name, $data);
      }
    }

    /**
     * [update the value of entry]
     * @param  string $name [description]
     * @param string|integer|boolean|double $data [value of setting]
     */
    private function update(string $name, $data)
    {
      $str = "UPDATE `%s` SET `data`='%s' WHERE `name` like '%s'";
      $sql = sprintf($str, $this->tablename, $data, $name);
      $this->wpdb->query($sql);
    }


    /**
     * [deliver the default data of settings from group
     *  if the parameter $group is null, then deliver the function all default settings
     * ]
     * @param string|null $group [name of settings group]
     * @return stdObject
     */
    private function getDefaultData($group)
    {
      $_values = clone $this->DEFAULT_VALUES;
      if($group!==null && property_exists($this->DEFAULT_VALUES, $group)){
        $_values = $this->DEFAULT_VALUES->{$group};
      }else{
        $_values = new stdClass();
        foreach ($this->DEFAULT_VALUES as $value) {
          foreach ($value as $key => $v) {
            $_values->{$key} = $v;
          }
        }
      }
      return clone $_values;
    }

    /**
     * [merg the values with the default values]
     * @param  array  $values       [list of setting name to value]
     * @param  string|null $group   [name of settings group]
     * @param  boolean $allowUnkown [if the parameter is false, then only the values are exited which also exist in the default settíngs data]
     * @return stdobject
     */
    private function mergWithDefaultValues(array $values, $group=null, $allowUnkown=true)
    {
      $result = new stdClass();
      $_values = $this->getDefaultData($group);
      foreach (get_object_vars($_values) as $key => $value) {
        $_values->{$key}->value = $_values->{$key}->defaultvalue;
        $_values->{$key}->change = false;
      }
      foreach ($values as $key => $v) {
        if(strlen($v)>0){
          if(!$allowUnkown and property_exists($_values, $key)){
            $_values->{$key}->change = true;
            $_values->{$key}->value = $v;
          }else if($allowUnkown){
            $_values->{$key}->value = $v;
          }else{
            // print sprintf('not set key %s value %s<br>', $key, $v);
          }
        }
      }
      return $_values;
    }

    /**
     * [return all values of settings]
     * @param  null|string  $group  [if the $group is not null, then deliver the values of group]
     * @param  boolean $filter [if $filter is true, then deliver only the names with values]
     * @return array
     */
    public function getAll($group = null, $filter = false)
    {
      $str = "SELECT * FROM `%s` %s";
      $where = '';
      if($group!==null){
        $where = sprintf("WHERE `group` like '%s'", $group);
      }
      $sql = sprintf($str, $this->tablename, $where);
      $dbResult = $this->wpdb->get_results( $sql);
      $values = [];

      foreach ($dbResult as $v) {
        $values[$v->name] = $v->data;
      }
      $data = $this->mergWithDefaultValues($values, $group);
      if($filter){
        foreach ($data as $key => $v) {
          switch ($v->type) {
            case 'boolean':
              $data->{$key} = intval($v->value)>0;
              break;
            default:
              $data->{$key} = $v->value;
              break;
          }
        }
      }
      return $data;
    }

    /**
     * [return validate post values]
     * @param  string  $group
     * @return array
     */
    private function getValidatePost(string $group)
    {
      $data = [];
      $defaultValues = $this->getDefaultData($group);
      foreach ($_POST as $key => $value) {
        if(property_exists($defaultValues, $key)){
          if(property_exists($defaultValues->{$key}, 'validate')){
            $validate = $defaultValues->{$key}->validate;
            $data[$key] = $validate($value);
          }else{
            switch ($defaultValues->{$key}->type) {
              case 'long-string':
              case 'string':
                $data[$key] = sanitize_text_field($value);
                break;
              case 'number':
                $data[$key] = intval(sanitize_key($value));
                break;
              case 'boolean':
                $value = intval(sanitize_key($value));
                if($value == 1 or $value == 0){
                 $data[$key] = $value;
                }
                break;
              default:
                break;
            }
          }// if else
        }//if
      }//foreach
      return $data;
    }

    /**
     * [derivers all values from the global variable $_POST and updates them]
     * @param  string $group
     */
    public function fetchPost(string $group)
    {
      $post = $this->getValidatePost($group);
      $_values = $this->mergWithDefaultValues($post, $group, false);
      foreach ($_values as $key => $value) {
        if(!$value->change && $this->is($key)){
          switch ($value->type) {
            case 'boolean':
              $value->value = 0;
              break;
            case 'string':
            case 'long-string':
              $value->value = $value->defaultvalue;
              break;
            default:
              $value->value = '';
              break;
          }//switch
        }
        $this->set($key, $value->value, $group);
      }//foreach

    }

  }
  ?>
