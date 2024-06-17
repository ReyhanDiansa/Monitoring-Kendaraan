<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Driver;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class DriverController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $driver = Driver::select('driver.id', 'driver.name', 'driver.nip', 'driver.created_at', 'driver.updated_at')->paginate();

            if (!$driver) {
                return $this->sendError('Data Not Found', null, 404);
            }
            return $this->sendResponse($driver, 'Successfully get Driver List.');
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while getting Driver List: ' . $e->getMessage(), null, 500);
        }
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        DB::beginTransaction();

        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'nip' => 'required|string|max:20|unique:driver,nip',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Error.', $validator->errors());
            }

            $data = [
                'name' => $request->name,
                'nip' =>  $request->nip
            ];

            $driver = Driver::create($data);


            DB::commit();

            return $this->sendResponse($driver, 'Driver Data  create Successfully');
        } catch (\Exception $e) {
            DB::rollback();
            return $this->sendError('An error occurred while storing Driver Data: ' . $e->getMessage(), null, 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        try {
            $driver = Driver::select('driver.id', 'driver.name', 'driver.nip', 'driver.created_at', 'driver.updated_at')
                ->where('id', $id)
                ->first();

            if (!$driver) {
                return $this->sendError('Data Not Found', null, 404);
            }

            return $this->sendResponse($driver, 'Successfully get Driver Data.');
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while get getting  Driver data: ' . $e->getMessage(), null, 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        DB::beginTransaction();

        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'nip' => [
                    'required',
                    'string',
                    'max:20',
                    Rule::unique('driver')->ignore($id),
                ],
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Error.', $validator->errors());
            }

            $driver = Driver::select('driver.id')->where('id', $id)->first();

            if (!$driver) {
                return $this->sendError('Driver Data Not Found', null, 404);
            }

            $data = [
                'name' => $request->name,
                'nip' =>  $request->nip
            ];

            $driver->update($data);

            DB::commit();

            return $this->sendResponse($driver, 'Driver Data Updated Successfully');
        } catch (\Exception $e) {
            DB::rollback();
            return $this->sendError('An error occurred while updatting Driver Data: ' . $e->getMessage(), null, 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        DB::beginTransaction();

        try {
            $driver = Driver::select('driver.id')->where('id', $id)->first();

            if ($driver) {
                $driver->delete();
                DB::commit();
                return $this->sendResponse(null, 'Driver Data Deleted Successfully');
            } else {
                DB::rollback();
                return $this->sendError('Driver data not found', null, 404);
            }
        } catch (\Exception $e) {
            DB::rollback();
            return $this->sendError('An error occurred while deleting Driver Data: ' . $e->getMessage(), null, 500);
        }
    }

    public function getName()
    {
        try {
            $driver = Driver::select('driver.id', 'driver.name')->get();

            if (!$driver) {
                return $this->sendError('Data Not Found', null, 404);
            }
            return $this->sendResponse($driver, 'Successfully get Driver List.');
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while getting Driver List: ' . $e->getMessage(), null, 500);
        }
    }

    public function filterData($keyword)
    {
        try {
            $results = Driver::query()
                ->where(function ($query) use ($keyword) {
                    $query->where('name', 'like', "%$keyword%")
                        ->orWhere('nip', 'like', "%$keyword%");
                })
                ->select('driver.id', 'driver.name', 'driver.nip', 'driver.created_at', 'driver.updated_at')
                ->paginate();

            return $this->sendResponse($results, 'Successfully retrieved Driver Data.');
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while getting driver data: ' . $e->getMessage(), null, 500);
        }
    }

    public function exportData(Request $request)
    {
        try {
            $keyword = $request->keyword;

            $query = Driver::query()
                ->select('driver.id', 'driver.name', 'driver.nip', 'driver.created_at', 'driver.updated_at');

            if (isset($keyword) && !empty($keyword)) {
                $query->where(function ($query) use ($keyword) {
                    $query->where('name', 'like', "%$keyword%")
                        ->orWhere('nip', 'like', "%$keyword%");
                });
            };

            $driver = $query->paginate(1000);

            if ($driver->isEmpty()) {
                return $this->sendError('Data Not Found', null, 404);
            }

            return $this->sendResponse($driver, 'Successfully get Driver.');
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while exporting Request Izin.: ' . $e->getMessage(), null, 500);
        }
    }
}
