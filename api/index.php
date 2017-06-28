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
        'remember'      => false
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

/*USER META EVENTOS */
$app->post("/add_user_events", function() use ($app){
    $json = $app->request->post('json');
    $data = json_decode($json, true);
    $json1 = '{}';
    $eventos =json_decode($json1);

    $response = add_user_meta( $data["user"], "events_followed", $eventos, true );
    echo json_encode($response);
});

$app->post("/update_user_events/:id", function($id_user) use ($app){
    $json = $app->request->post('json');
    //$eventos = json_decode($json, true);
    $eventos = json_decode($json);

    $response = update_user_meta( $id_user, "events_followed", $eventos);
    echo json_encode($response);
});

$app->get("/get_user_events/:id", function($id) use ($app){
    //$json = $app->request->post('json');
    //$data = json_decode($json, true);

    $response = get_user_meta( $id,"events_followed" );
    echo json_encode($response);
});

$app->get("/delete_user_events/:id", function($id) use ($app){
    //$json = $app->request->post('json');
    //$data = json_decode($json, true);

    $response = delete_user_meta( $id, "events_followed" );
    echo json_encode($response);
});


/*USER META CATEGORIAS */
$app->post("/add_user_categories", function() use ($app){
    $json = $app->request->post('json');
    $data = json_decode($json, true);
    $json1 = '{}';
    $eventos =json_decode($json1);

    $response = add_user_meta( $data["user"], "categories_followed", $eventos, true );
    echo json_encode($response);
});

$app->post("/update_user_categories/:id", function($id_user) use ($app){
    $json = $app->request->post('json');
    $categorias = json_decode($json, true);

    $response = update_user_meta( $id_user, "categories_followed", $categorias);
    echo json_encode($response);
});

$app->get("/get_user_categories/:id", function($id) use ($app){
    //$json = $app->request->post('json');
    //$data = json_decode($json, true);

    $response = get_user_meta( $id,categories_followed );
    echo json_encode($response);
});

$app->get("/delete_user_categories/:id", function($id) use ($app){
    //$json = $app->request->post('json');
    //$data = json_decode($json, true);

    $response = delete_user_meta( $id, "categories_followed" );
    echo json_encode($response);
});

/*USER META image */
$app->post("/update_user_image/:id", function($id_user) use ($app){
    if(isset($_FILES['file'])){
        $target_path = './images/';
        $target_path = $target_path . basename($_FILES['file']['name']);
        $source_img = @imagecreatefromjpeg($_FILES["file"]["tmp_name"]);
        if($source_img){
            $new_w = $new_h = 300;
        
            $orig_w = imagesx($source_img);
            $orig_h = imagesy($source_img);
                
            $w_ratio = ($new_w / $orig_w);
            $h_ratio = ($new_h / $orig_h);
                
            if ($orig_w > $orig_h ) {//landscape
                $crop_w = round($orig_w * $h_ratio);
                $crop_h = $new_h;
            } elseif ($orig_w < $orig_h ) {//portrait
                $crop_h = round($orig_h * $w_ratio);
                $crop_w = $new_w;
            } else {//square
                $crop_w = $new_w;
                $crop_h = $new_h;
            }
            $dest_img = imagecreatetruecolor($new_w,$new_h);
            imagecopyresampled($dest_img, $source_img, 0 , 0 , 0, 0, $crop_w, $crop_h, $orig_w, $orig_h);

            if(imagejpeg($dest_img, $target_path)) {
                imagedestroy($dest_img);
                imagedestroy($source_img);
                $response= "Upload and move success";
            } else {
                $response="No se ha podido subir";
            }
        }
    }else{
        $response="No ha llegado la imagen, pero el id es: ".$id_user;
    }
    /*$json = $app->request->post('json');
    $imagen = json_decode($json, true);

    $response = update_user_meta( $id_user, "imageApp", $imagen);*/
    echo json_encode($response);
});

$app->get("/get_user_image/:id", function($id) use ($app){
    //$json = $app->request->post('json');
    //$data = json_decode($json, true);

    $response = get_user_meta( $id,"imageApp" );
    echo json_encode($response);
});

$app->run();
