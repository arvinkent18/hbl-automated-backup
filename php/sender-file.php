<?php
    $program = $_REQUEST['program'];
    $sender = $_REQUEST['sender'];
    $recipients = array_values($_REQUEST['recipient']);
    $otherRecipient = $_REQUEST['other_recipient'];
    $normalList = $_REQUEST['normal_list'];
    $specialNamed = $_REQUEST['special_named'];
    $digitCode = $_REQUEST['digit_code'];

    if (!empty($otherRecipient)) {
        array_push($recipients, $otherRecipient);
    }

    $normalOrSpecial = '';

    if (!empty($normalList) && $normalList == 'Normal list for program selected') {
        $normalOrSpecial = $normalList;
    }
    else {
        $normalOrSpecial = $specialNamed;
    }

    $output = array(
        'program'               => $program, 
        'isp'                   => $sender, 
        'send-to-testing'       => $recipients,
        'send-to-real'          => array($normalOrSpecial, $digitCode)
    );
    // file used to be named settingsdb.json
    $data = json_encode($output);
    $file = fopen('../_opts.json', 'w+') or die('Unable to open file!');
    fwrite($file, $data);
    fclose($file);

    $commandOutput = shell_exec("python /hbposts.com/_send.py");
    var_dump($commandOutput);