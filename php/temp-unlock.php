<?php
    $command = escapeshellcmd('chmod -R 0755 ../_work.htm');
    $output = shell_exec($command);