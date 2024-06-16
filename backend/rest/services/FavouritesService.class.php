<?php

require_once __DIR__ . "/../dao/FavouritesDao.class.php";

class FavouritesService {
    private $favourites_dao;

    public function __construct() {
        $this->favourites_dao = new FavouritesDao();
    }

    public function addFavourite($favourite) {
        return $this->favourites_dao->addFavourite($favourite);
    }

    public function get_favourites_by_user_id($user_id) {
        $favourites = $this->favourites_dao->get_favourites_by_user_id($user_id);
        return array_map(function($fav) {
            return $fav['propertyId'];
        }, $favourites);
    }
}