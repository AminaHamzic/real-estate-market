<?php

use OpenApi\Annotations as OA;
require_once __DIR__ . '/../services/FavouritesService.class.php';

Flight::set('favourites_service', new FavouritesService());

Flight::group('/favourites', function() {
    Flight::route('POST /', function() {
        $favourites_service = Flight::get('favourites_service');
        $payload = Flight::request()->data->getData();
        $data = $favourites_service->addFavourite($payload);
        Flight::json(['data' => $data]);
    });

    Flight::route('GET /@id', function($id) {
        $favourites_service = Flight::get('favourites_service');
        $data = $favourites_service->get_favourites_by_user_id($id);
        Flight::json($data);
    });

});