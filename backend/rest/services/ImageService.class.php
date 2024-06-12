<?php

require_once __DIR__ . "/../dao/ImageDao.class.php";

class ImageService {
    private $image_dao;

    public function __construct() {
        $this->image_dao = new ImageDao();
    }

    public function addImage($image) {
        return $this->image_dao->addImage($image);
    }

    public function delete_image($idimages) {
        $this->image_dao->delete_image($idimages);
    }

    public function get_image_by_id($idimages) {
        return $this->image_dao->get_image_by_id($idimages);
    }


}