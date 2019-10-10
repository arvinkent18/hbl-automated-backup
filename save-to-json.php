<?php
    $program = $_REQUEST['program'];
    $sender = $_REQUEST['sender'];
    $recipients = $_REQUEST['recipient'];
    $otherRecipient = $_REQUEST['other_recipient'];
    $normalList = $_REQUEST['normal_list'];
    $specialNamed = $_REQUEST['special_named'];
    $digitCode = $_REQUEST['digit_code'];
    $doingReal = $_REQUEST['doing_real'];

    $normalOrSpecial = '';

    if (!empty($normalList) && $normalList == 'default') {
        $normalOrSpecial = $normalList;
    }
    else {
        $normalOrSpecial = $specialNamed;
    }

    $output = array(
        'program'               => $program, 
        'isp'                   => $sender, 
        'testers'               => $recipients,
        'other_tester'          => $otherRecipient,
        'real_addrs-list'       => $normalOrSpecial,
        'digit-code'            => $digitCode,
        'doing-real'            => $doingReal
    );

    $data = json_encode($output);
    $file = fopen('_OPTS.json', 'w+') or die('Unable to open file!');
    fwrite($file, $data);
    fclose($file);