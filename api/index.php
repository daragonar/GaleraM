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

/*LOGIN/REGISTRO-----------*/

$app->post("/login", function() use ($app){
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

/*USER META-----------*/

$app->post("/add_user_meta", function() use ($app){
    $json = $app->request->post('json');
    $data = json_decode($json, true);
    print_r($data);
    $eventos=array();

    $response = add_user_meta( $data["user"], "events_followed", $eventos, true );
    echo $response;
    /*if (is_wp_error ($response)){
        $result= array(
            'status' => 'error',
            'code' => 404,
            'data' => $result->get_error_message()
        );
    }else{
        $result= array(
            'status' => 'success',
            'code' => 200,
            'data' =>$result
        );
    }
    echo json_encode($result);*/
});





$app->run();
