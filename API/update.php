<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: PUT");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


 $method = $_SERVER['REQUEST_METHOD'];

if ($method == "OPTIONS") {
    die();
}


if ($_SERVER['REQUEST_METHOD'] !== 'PUT') :
    http_response_code(405);
    echo json_encode([
        'success' => 0,
        'message' => 'Bad Request detected! Only PUT method is allowed',
    ]);
    exit;
endif;

require 'db_connect.php';
$database = new Operations();
$conn = $database->dbConnection();

$data = json_decode(file_get_contents("php://input"));

//print_r($data);

//die();



if (!isset($data->id)) {
    echo json_encode(['success' => 0, 'message' => 'Please enter correct sample id.']);
    exit;
}

try {

    $fetch_post = "SELECT * FROM `sample` WHERE id=:id";
    $fetch_stmt = $conn->prepare($fetch_post);
    $fetch_stmt->bindValue(':id', $data->id, PDO::PARAM_INT);
    $fetch_stmt->execute();

    if ($fetch_stmt->rowCount() > 0) :
     //echo 'AAA';
        $row = $fetch_stmt->fetch(PDO::FETCH_ASSOC);
        $name = isset($data->name) ? $data->name : $row['name'];
        $state = isset($data->state) ? $data->state : $row['state'];
        $zip = isset($data->zip) ? $data->zip : $row['zip'];
        $amount = isset($data->amount) ? $data->amount : $row['amount'];
        $qty = isset($data->qty) ? $data->qty : $row['qty'];
        $item = isset($data->item) ? $data->item : $row['item'];

       

       $update_query = "UPDATE `sample` SET name = :name, state = :state,  zip = :zip, amount = :amount,
       qty = :qty, item = :item       
        WHERE id = :id";
        $update_stmt = $conn->prepare($update_query);

        $update_stmt->bindValue(':name', htmlspecialchars(strip_tags($name)), PDO::PARAM_STR);
        $update_stmt->bindValue(':state', htmlspecialchars(strip_tags($state)), PDO::PARAM_STR);
        $update_stmt->bindValue(':zip', htmlspecialchars(strip_tags($zip)), PDO::PARAM_STR);
        $update_stmt->bindValue(':amount', htmlspecialchars(strip_tags($amount)), PDO::PARAM_STR);
        $update_stmt->bindValue(':qty', htmlspecialchars(strip_tags($qty)), PDO::PARAM_STR);
        $update_stmt->bindValue(':item', htmlspecialchars(strip_tags($item)), PDO::PARAM_STR);
        $update_stmt->bindValue(':id', $data->id, PDO::PARAM_INT);


        if ($update_stmt->execute()) { 

            echo json_encode([
                'success' => 1,
                'message' => 'Record udated successfully'
            ]);
            exit;
        }

        echo json_encode([
            'success' => 0,
            'message' => 'Did not udpate. Something went  wrong.'
        ]);
        exit;

    else :
        echo json_encode(['success' => 0, 'message' => 'Invalid ID. No record found by the ID.']);
        exit;
    endif;
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'success' => 0,
        'message' => $e->getMessage()
    ]);
    exit;
}