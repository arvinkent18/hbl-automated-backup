<?php
	$file = '../_work.htm';
	
	// the following line prevents the browser from parsing this as HTML.
	header('Content-Type: text/plain');

	if ( is_file( $file ) ) {
		if ( is_readable( $file ) ) {
			$contents = file_get_contents($file);
			$pattern = '/<td.*class=.postbody.*[\n]+.*?<\/td>/';

			// search, and store all matching occurences in $matches
			if(preg_match_all($pattern, $contents, $matches)){
			echo implode("\n", $matches[0]);
			}
			else{
			echo "No matches found";
			}
		}
		else {
			echo $file . ' is not readable';
		}
	}
	else {
		echo $file . ' is not a file';
	}