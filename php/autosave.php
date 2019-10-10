<?php
    ini_set('display_errors', 1); // set to 0 for production version
    error_reporting(E_ALL);

    $data = $_REQUEST['content'];

    foreach ($_REQUEST['inputbutton'] as $key => $value) {
        $newData = str_replace('<input class="radio-buttons" id="' . $value . '" name="cols" type="radio" />', ' ', $data);
    }

    $path = '../_work.htm';
    $file = fopen($path, 'w+') or die('Unable to open file!');
    echo fwrite($file, $newData);
    fclose($file);