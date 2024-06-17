<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AuthController extends BaseController
{
    public function register(Request $request)
    {
        DB::beginTransaction();

        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8|confirmed',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Error.', $validator->errors());
            }

            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            DB::commit();

            return $this->sendResponse($user, 'Register User Successfully');
        } catch (\Exception $e) {
            DB::rollback();
            return $this->sendError('An error occurred while updatting Driver Data: ' . $e->getMessage(), null, 500);
        }
    }

    public function login(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'email' => 'required|string|email',
                'password' => 'required|string',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Error.', $validator->errors());
            }


            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return $this->sendError('The provided credentials are incorrect.', null, 404);
            }

            $token = $user->createToken('authToken')->plainTextToken;

            return $this->sendResponse($token, 'Login Successfully');
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while Login: ' . $e->getMessage(), null, 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();
    
            return $this->sendResponse(null, 'Logged Out Successfully');
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while Logged Out: ' . $e->getMessage(), null, 500);
        }
    }

    public function profile(Request $request)
    {
        try {
            $user=$request->user();
            return $this->sendResponse($user, 'User Login Data Fetching Successfully');
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while getting User Login Data: ' . $e->getMessage(), null, 500);
        }
    }
}
