<?php

use OpenApi\Annotations as OA;
require_once __DIR__ . '/../services/ImageService.class.php';

Flight::set('image_service', new ImageService());

Flight::group('/image', function() {
    Flight::route('GET /@id', function($id){
        $image_service = Flight::get('image_service');
        $data = $image_service->get_image_by_id($id);
        Flight::json($data);
    });

    Flight::route('POST /', function(){
        $image_service = Flight::get('image_service');
        $data = Flight::request()->data->getData();
        $image = $image_service->addImage($data);
        Flight::json($image);
    });

});