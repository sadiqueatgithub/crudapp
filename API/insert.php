<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 

$method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
    die();
}

 
if ($_SERVER['REQUEST_METHOD'] !== 'POST') :
    http_response_code(405);
    echo json_encode([
        'success' => 0,
        'message' => 'Bad Request!.Only POST method is allowed',
    ]);
    exit;
endif;
 
require 'db_connect.php';
$database = new Operations();
$conn = $database->dbConnection();
 
$data = json_decode(file_get_contents("php://input"));

/* if (!isset($data->name) || !isset($data->state) || !isset($data->zip)) :
 
    echo json_encode([
        'success' => 0,
        'message' => 'Please enter compulsory fileds |  Name, State and Zip',
    ]);
    exit;
 
elseif (empty(trim($data->name)) || empty(trim($data->state)) || empty(trim($data->zip))) :
 
    echo json_encode([
        'success' => 0,
        'message' => 'Field cannot be empty. Please fill all the fields.',
    ]);
    exit;
 
endif; */
 
try {

    $name = htmlspecialchars(trim($data->name));
    $state = htmlspecialchars(trim($data->state));
    $zip = htmlspecialchars(trim($data->zip));
    $amount = htmlspecialchars(trim($data->amount));
    $qty = htmlspecialchars(trim($data->qty)); 
    $item = htmlspecialchars(trim($data->item));
 
    $query = "INSERT INTO `sample`(
    name,
    state,
    zip,
    amount,
    qty,
    item   
    ) 
    VALUES(
    :name,
    :state,
    :zip,
    :amount,
    :qty,
    :item   
    )";
 
    $stmt = $conn->prepare($query);
 
    $stmt->bindValue(':name', $name, PDO::PARAM_STR);
    $stmt->bindValue(':state', $state, PDO::PARAM_STR);
    $stmt->bindValue(':zip', $zip, PDO::PARAM_STR);
    $stmt->bindValue(':amount', $amount, PDO::PARAM_STR);
    $stmt->bindValue(':qty', $qty, PDO::PARAM_STR);
    $stmt->bindValue(':item', $item, PDO::PARAM_STR);
       

    if ($stmt->execute()) {
 
        http_response_code(201);
        echo json_encode([
            'success' => 1,
            'message' => 'Data Inserted Successfully.'
        ]);
        exit;
    }
    
    echo json_encode([
        'success' => 0,
        'message' => 'There is some problem in data inserting'
    ]);
    exit;
 
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => 0,
        'message' => $e->getMessage()
    ]);
    exit;
}
