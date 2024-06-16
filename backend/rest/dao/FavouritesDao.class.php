<?php

require_once __DIR__ . "/BaseDao.class.php";

class FavouritesDao extends BaseDao{
    public function __construct(){
        parent::__construct("favourites");
    }

    public function addFavourite($favourite){
        return $this->insert('favourites', $favourite);
    }

    public function get_favourites_by_user_id($user_id){
        return $this->query("SELECT propertyId FROM favourites WHERE user_id = :user_id", ["user_id" => $user_id]);
    }

}