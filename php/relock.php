<?php
    $command = escapeshellcmd('chmod -R 0444 ../_work.htm');
    $output = shell_exec($command);