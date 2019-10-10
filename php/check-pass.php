<?php
    $loggedFile = 'logged-password.txt';
    $loggedPass = file_get_contents($loggedFile);
    echo $loggedPass;