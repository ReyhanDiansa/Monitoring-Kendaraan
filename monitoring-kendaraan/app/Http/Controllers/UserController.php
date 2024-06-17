<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class UserController extends BaseController
{
    /**
     * Display a paginated list of users.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $users = User::select('id', 'name', 'email', 'role', 'created_at', 'updated_at')->paginate();

            if ($users->isEmpty()) {
                return $this->sendError('Users not found.', null, 404);
            }

            return $this->sendResponse($users, 'Successfully fetched users list.');
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while fetching users list: ' . $e->getMessage(), null, 500);
        }
    }

    /**
     * Store a newly created user in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:6',
                'role' => 'required|string|in:admin,user',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Error.', $validator->errors());
            }

            $data=[
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'role' => $request->role,
            ];

            $user = User::create($data);

            return $this->sendResponse($user, 'User created successfully.', 201);
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while storing user data: ' . $e->getMessage(), null, 500);
        }
    }

    /**
     * Display the specified user.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $user = User::select('id', 'name', 'email', 'role', 'created_at', 'updated_at')->find($id);

            if (!$user) {
                return $this->sendError('User not found.', null, 404);
            }

            return $this->sendResponse($user, 'Successfully fetched user data.');
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while fetching user data: ' . $e->getMessage(), null, 500);
        }
    }

    /**
     * Update the specified user in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email,' . $id,
                'role' => 'required|string|in:admin,user',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Error.', $validator->errors());
            }

            $user = User::find($id);

            if (!$user) {
                return $this->sendError('User not found.', null, 404);
            }

            $data=[
                'name' => $request->name,
                'email' => $request->email,
                'role' => $request->role,
            ];

            if(isset($request->password)){
                $data['password'] = bcrypt($request->password); 
            }

            $user->update($data);


            return $this->sendResponse($user, 'User updated successfully.');
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while updating user data: ' . $e->getMessage(), null, 500);
        }
    }

    /**
     * Remove the specified user from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $user = User::find($id);

            if (!$user) {
                return $this->sendError('User not found.', null, 404);
            }

            $user->delete();

            return $this->sendResponse(null, 'User deleted successfully.');
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while deleting user data: ' . $e->getMessage(), null, 500);
        }
    }

    public function getName()
    {
        try {
            $users = User::select('id', 'name')->where('role','user')->get();

            if ($users->isEmpty()) {
                return $this->sendError('Users not found.', null, 404);
            }

            return $this->sendResponse($users, 'Successfully fetched users list.');
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while fetching users list: ' . $e->getMessage(), null, 500);
        }
    }
    public function filterData($keyword)
    {
        try {
            $results = User::query()
                ->where(function ($query) use ($keyword) {
                    $query->where('name', 'like', "%$keyword%")
                        ->orWhere('email', 'like', "%$keyword%")
                        ->orWhere('role', 'like', "%$keyword%");
                })
                ->select('id', 'name', 'email', 'role', 'created_at', 'updated_at')
                ->paginate();

            return $this->sendResponse($results, 'Successfully retrieved User Data.');
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while getting User data: ' . $e->getMessage(), null, 500);
        }
    }

    public function exportData(Request $request)
    {
        try {
            $keyword = $request->keyword;

            $query = User::query()
            ->select('id', 'name', 'email', 'role', 'created_at', 'updated_at');

            if (isset($keyword) && !empty($keyword)) {
                $query->where(function ($query) use ($keyword) {
                    $query->where('name', 'like', "%$keyword%")
                        ->orWhere('email', 'like', "%$keyword%")
                        ->orWhere('role', 'like', "%$keyword%");
                });
            };

            $user = $query->paginate(1000);

            if ($user->isEmpty()) {
                return $this->sendError('Data Not Found', null, 404);
            }

            return $this->sendResponse($user, 'Successfully get User.');
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while exporting User.: ' . $e->getMessage(), null, 500);
        }
    }
}
