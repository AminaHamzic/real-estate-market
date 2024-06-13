<?php

require_once __DIR__ . "/BaseDao.class.php";

class ImageDao extends BaseDao {
    
        public function __construct() {
            parent::__construct("images");
        }
    
        public function addImage($image) {
            return $this->insert('images', $image);
        }
    
        public function delete_image($id) {
            $query = "DELETE FROM images WHERE propertyid = :id";
            $this->execute($query, [
                'id' => $id
            ]);
        }
    
        public function get_image_by_id($id) {
            return $this->query_unique(
                "SELECT Image FROM images WHERE propertyid = :id", 
                ["id" => $id]);
        }
}
