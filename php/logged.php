<?php
    $loggedFile = 'logged-user.txt';
    $loggedUser = file_get_contents($loggedFile);
    echo $loggedUser;