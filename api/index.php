<?php
//error_reporting(E_ALL);
//ini_set('display_errors', '1');
require_once 'vendor/autoload.php';
require_once '../wp-load.php';

$app = new \Slim\Slim();

// Configuración de cabeceras
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];
if($method == "OPTIONS") {
    die();
}

$app->get("/pruebas", function() use($app){
    echo "Hola mundo desde Slim PHP";
});

$app->post("/register",function() use ($app)
{
    $json = $app->request->post('json');
    $data = json_decode($json, true);
    
$user = wp_create_user( $data["user"], $data["pass"],$data["mail"] );
     if ( is_wp_error( $user ) ) {
        $result= array(
            'status' => 'error',
            'code' => 404,
            'data' => $user->get_error_message()
        );
    }else{
        $result= array(
            'status' => 'success',
            'code' => 200,
            'data' =>$user
        );
    }
    echo json_encode($result);
});

$app->post("/user", function() use ($app){
    $json = $app->request->post('json');
    $data = json_decode($json, true);
    
    $creds = array(
        'user_login'    => $data["user"],
        'user_password' => $data["pass"],
        'remember'      => $data["remember"]
    );
    $user = wp_signon( $creds, false );
     if ( is_wp_error( $user ) ) {
        $result= array(
            'status' => 'error',
            'code' => 404,
            'data' => $user->get_error_message()
        );
    }else{
        $result= array(
            'status' => 'success',
            'code' => 200,
            'data' =>$user
        );
    }
    echo json_encode($result);
});

$app->get("/user/:email", function($email) use ($app){
    $user=get_user_by_email($email);
    if(!empty($user)){
        $result= array(
            'status' => 'success',
            'code' => 200,
            'data' => $user
        );
    }else{
        $result= array(
            'status' => 'error',
            'code' => 404,
            'message' => 'Este usuario no existe'
        );
    }
    echo json_encode($result);

});

$app->run();
