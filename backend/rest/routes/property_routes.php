<?php

use OpenApi\Annotations as OA;
require_once __DIR__ . '/../services/PropertyService.class.php';

Flight::set('property_service', new PropertyService());

Flight::group('/properties', function() {

    /**
     * @OA\Get(
     *      path="/properties",
     *      tags={"properties"},
     *      summary="Get all properties",
     *      @OA\Response(
     *           response=200,
     *           description="Array of all properties in the database"
     *      )
     * )
     */
    Flight::route('GET /', function() {
        $property_service = Flight::get('property_service');
        $data = $property_service->get_properties();
        Flight::json(['data' => $data]);
    });

    /**
     * @OA\Post(
     *     path="/properties",
     *     summary="Add a new property",
     *     tags={"properties"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Property")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Property added",
     *         @OA\JsonContent(ref="#/components/schemas/Property")
     *     )
     * )
     */
    Flight::route('POST /', function() {
        $property_service = Flight::get('property_service');
        $payload = Flight::request()->data->getData();

        // Handle Base64 image data
        if (isset($payload['Image'])) {
            $property = $property_service->addProperty($payload, $payload['Image']);
            Flight::json(['message' => "Property added!", 'data' => $property, 'id' => $property_service->last_id()], 201);
        } else {
            Flight::json(['error' => 'Image data is missing.'], 400);
        }
    });

    /**
     * @OA\Delete(
     *     path="/properties/{id}",
     *     summary="Delete a property",
     *     tags={"properties"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Property deleted",
     *         @OA\JsonContent(type="object", @OA\Property(property="message", type="string"))
     *     )
     * )
     */
    Flight::route('DELETE /@id', function($id) {
        $property_service = Flight::get('property_service');

        if (empty($id)) {
            Flight::json(['error' => "You must provide a valid property ID!"], 400);
            return;
        }

        $result = $property_service->delete_property($id);

        if ($result['success']) {
            Flight::json(['message' => 'You have successfully deleted the property!']);
        } else {
            Flight::json(['error' => 'No property found with that ID.'], 404);
        }
    });

    /**
     * @OA\Post(
     *     path="/properties/{id}",
     *     summary="Update a property",
     *     tags={"properties"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Property")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Property updated",
     *         @OA\JsonContent(type="object", @OA\Property(property="success", type="string"))
     *     )
     * )
     */
    Flight::route('POST /@id', function($id) {
        $property_service = Flight::get('property_service');
        $payload = Flight::request()->data->getData();
    
        try {
            // Handle Base64 image data
            if (isset($payload['Image'])) {
                $property = $property_service->updateProperty($id, $payload, $payload['Image']);
                Flight::json(['message' => "Property updated!", 'data' => $property]);
            } else {
                Flight::json(['error' => 'Image data is missing.'], 400);
            }
        } catch (Exception $e) {
            error_log($e->getMessage());
            Flight::json(['error' => 'Internal Server Error'], 500);
        }
    });

    /**
     * @OA\Get(
     *     path="/properties/{id}",
     *     summary="Get a property by ID",
     *     tags={"properties"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Property details",
     *         @OA\JsonContent(ref="#/components/schemas/Property")
     *     )
     * )
     */
    Flight::route('GET /@id', function($id) {
        $property_service = Flight::get('property_service');

        if (!empty($id)) {
            $property = $property_service->get_property_by_id($id);
            Flight::json($property);
        } else {
            Flight::json(['error' => 'Bad request'], 400);
        }
    });


    Flight::route('GET /favourites', function() {
        $property_service = Flight::get('property_service');
        $ids = Flight::request()->data->getData();
        $data = $property_service->get_get_properties_by_ids($ids);
        Flight::json(['data' => $data]);
    });

    Flight::route('GET /user/@user_id/favourites', function($user_id) {
        $favourites_service = Flight::get('favourites_service');
        $property_service = Flight::get('property_service');

        // Get the list of favorite property IDs
        $property_ids = $favourites_service->get_favourites_by_user_id($user_id);

        // If there are no favorites, return an empty array
        if (empty($property_ids)) {
            Flight::json(['data' => []]);
            return;
        }

        // Get the details of the properties
        $properties = $property_service->get_properties_by_ids($property_ids);

        // Return the properties in the response
        Flight::json(['data' => $properties]);
    });

});


