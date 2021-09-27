<div id="wpbody-content">
  <form method='post' action=''>
    <table class="form-table">
<?php

/**
 * [deliver the description p tag]
 * @param  stdobject $entry
 * @return String
 */
function qsr_printDescription($entry)
{
  $description = property_exists($entry, "description")? $entry->description: "";
  if(property_exists($entry, 'description')){
    return <<<HTML
    <p class="description">$description</p>
HTML;
  }
}


$qsr_printDescription = 'qsr_printDescription';


foreach ($formvalues as $name => $entry){
  $defaultValue = esc_html($entry->defaultvalue);
  $title = esc_html($entry->title);
  print <<<HTML
    <tr>
      <th scope="row"><label for="name">$title</label></th>
HTML;
  $name = esc_html($name);
  $value = esc_html($entry->value);
  $style = property_exists($entry, "style")? esc_html($entry->style): "";
  $placeholder = property_exists($entry, "placeholder")? esc_html($entry->placeholder): "";
  switch ($entry->type) {
    case 'string':
      print <<<HTML
        <td>
          <div><input type='text' name='$name' value='$value' data-default='$defaultValue' placeholder='$placeholder' /><span class="reset" ><span class="dashicons dashicons-update"></span></span></div>          
          {$qsr_printDescription($entry)}          
        </td>
HTML;
      break;
      case 'long-string':
        print <<<HTML
          <td>
            <div><textarea name="$name" class="regular-text" placeholder='$placeholder' data-default='$defaultValue' rows="3" style="$style" >$value</textarea><span class="reset" ><span class="dashicons dashicons-update"></span></span></div>    
            {$qsr_printDescription($entry)}
          </td>
HTML;
      break;
      case 'number':
        $minvalue = esc_html($entry->minvalue);
        $maxvalue = esc_html($entry->maxvalue);
        print <<<HTML
          <td>
            <div><input name='$name' type="number" value='$value' data-default='$defaultValue' min='$minvalue' max='$maxvalue' /><span class="reset" ><span class="dashicons dashicons-update"></span></span></div>  
            {$qsr_printDescription($entry)}
          </td>
HTML;
    break;
    case 'boolean':
      $checked = checked( $entry->value, true, false );
      $selectedEnabled = "";
      $selectedDisabled = "";
      $entry->value? $selectedEnabled = "selected": $selectedDisabled = "selected";
      print <<<HTML
        <td>
          <div><select name='$name' data-default='$defaultValue' >
            <option value="1" {$selectedEnabled} >Enabled</option>
            <option value="0" {$selectedDisabled}>Disabled</option>
          </select><span class="reset" ><span class="dashicons dashicons-update"></span></span></div>  
          {$qsr_printDescription($entry)}
        </td>
HTML;
      //<input name='$name' type="checkbox" value='1' $checked />
    break;
    case 'color':
print <<<HTML
        <td>
          <div><input type='color' name='$name' data-default='$defaultValue' value='$value' /><span class="reset" ><span class="dashicons dashicons-update"></span></span></div> 
          {$qsr_printDescription($entry)}
        </td>
HTML;
    break;
    default:
//    print <<<HTML
//      <td>
//        <span>$name</span>
//        {$qsr_printDescription($entry)}
//      </td>
//HTML;
      break;
  }//switch

  print <<<HTML
    </tr>
HTML;



}
?>
      <tr>
       <td>&nbsp;</td>
       <td>  <?php submit_button(); ?></td>
      </tr>
   </table>
  </form>
</div>
