<?php


namespace App\Http\Controllers;


use Illuminate\Http\Response;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller as Controller;
use App\Models\Log;

class BaseController extends Controller
{
    /**
     * success response method.
     *
     * @return \Illuminate\Http\Response
     */
    public function sendResponse($result, $message,$code=200,$additional=null)
    {
    	$response = [
            'success' => true,
            'data'    => $result,
            'message' => $message,
            'additional_data'    => $additional,
        ];


        return response()->json($response, $code);
    }


    /**
     * return error response.
     *
     * @return \Illuminate\Http\Response
     */
    public function sendError($error, $errorMessages = [], $code = 440)
    {
    	$response = [
            'success' => false,
            'message' => $error,
        ];


        if(!empty($errorMessages)){
            $response['data'] = $errorMessages;
        }


        return response()->json($response, $code);
    }

}
