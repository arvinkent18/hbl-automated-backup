<?php
    $current_file = file_get_contents('../file-to-load.txt');
    $backup_filepath = '/home/hbladmin/hbposts_backup/'.$current_file.'.bak';
    $destination = '/home/hbladmin/hbposts.com/'.$current_file;

    if (!copy($backup_filepath, $destination)){
        echo 0;
    }
    else {
        echo 1;
    }

    