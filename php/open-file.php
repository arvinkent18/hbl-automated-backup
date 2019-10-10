<?php
    $content = file_get_contents('../'.$_REQUEST['filename']);

    $backupOldFile = file_get_contents('../file-to-load.txt');
    
    $backupFile = fopen('../file-to-load.txt', 'w+') or die('Unable to open file!');
    fwrite($backupFile, $_REQUEST['filename']);
    fclose($backupFile);