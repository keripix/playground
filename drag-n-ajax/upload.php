<?php

$uploadedFiles = [];

foreach ($_FILES["file"]["error"] as $key => $error) {

    if ($error == UPLOAD_ERR_OK) {
        $uploadedFiles[] = array(
            "name" => $_FILES["file"]["name"][$key],
            "type" => $_FILES["file"]["type"][$key],
            "size" => $_FILES["file"]["size"][$key]
        );
    }
    
}

echo json_encode($uploadedFiles);