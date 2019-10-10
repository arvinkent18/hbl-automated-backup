<?php
	$req = $_REQUEST['request'];

	if ( $req == 'clean-up' ) {
		$command = escapeshellcmd('/home/hbl/HBLetter/sar.py');
		$output = shell_exec($command);

		echo $output;
	}
	elseif ( $req == 'send-to-list' ) {
		exec('/usr/local/bin/python3.7 /home/hbl/HBLetter/betaSend.py');
		//$output = shell_exec($command);

		//echo $output;
	}
	elseif ( $req == 'test') {
		$command = escapeshellcmd('/home/hbl/HBLetter/pythontester.py');
		$output = shell_exec($command);

		echo $output;
	}