<?php

$uploadedFiles = [];

foreach ($_FILES["file"]["name"] as $key => $name) {
    $uploadedFiles[] = array(
        "name" => $_FILES["file"]["name"][$key],
        "type" => $_FILES["file"]["type"][$key],
        "size" => $_FILES["file"]["size"][$key]
    );
}

echo json_encode($uploadedFiles);