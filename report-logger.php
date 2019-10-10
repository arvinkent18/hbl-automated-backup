<?php
    function file_prepend($string, $filename) {

        $fileContent = file_get_contents ($filename);

        file_put_contents ($filename, $string . "\n" . $fileContent);
    }

    $currentDateTime = date('F j, Y, g:i a');
    
    $reportLog = $_REQUEST['content'];
    $mode = $_REQUEST['mode'];

    $filename = 'run.log';

    $contentFormat  = '***********************************************************************************************';
    $contentFormat .= PHP_EOL;
    $contentFormat .= PHP_EOL;
    $contentFormat .= 'Mode: ' . $mode . '|' . 'Time: ' . $currentDateTime;
    $contentFormat .= PHP_EOL;
    $contentFormat .= PHP_EOL;
    $contentFormat .= 'Result:';
    $contentFormat .= PHP_EOL;
    $contentFormat .= PHP_EOL;
    $contentFormat .= strip_tags($reportLog);
    $contentFormat .= PHP_EOL;
    $contentFormat .= PHP_EOL;
    $contentFormat .= '***********************************************************************************************';
    $contentFormat .= PHP_EOL;
    $contentFormat .= PHP_EOL;

    $content = file_prepend($contentFormat, $filename);
