<?php
    $file = '../_work.htm';
    
    if (is_writable($file)) {
        echo 1;
    }
    else {
        echo 0;
    }
    