<?php
    $pathToSettings = '_OPTS.json';
    
    $settings = file_get_contents($pathToSettings);

    $data = json_decode($settings, true);

    if (isset($_REQUEST['mode']) && $_REQUEST['mode'] == 'Real') {
        $data['doing-real'] = 1;
    }
    else {
        $data['doing-real'] = 0;
    }

    $storeData = json_encode($data);

    file_put_contents($pathToSettings, $storeData);

    $command = escapeshellcmd('python _gensend.py');
    $output = shell_exec($command);
    
    echo $output;