<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transport;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class TransportController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $transports = Transport::select('transport.id', 'transport.name', 'transport.type', 'transport.ownership', 'transport.fuel')->paginate();

            if ($transports->isEmpty()) {
                return $this->sendError('Data Not Found', null, 404);
            }

            return $this->sendResponse($transports, 'Successfully get Transport List.');
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while getting Transport List: ' . $e->getMessage(), null, 500);
        }
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
                'type' => 'required|string|max:255',
                'ownership' => 'required|string|max:255',
                'fuel' => 'required|max:255',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Error.', $validator->errors());
            }

            $data = [
                'name' => $request->name,
                'type' =>  $request->type,
                'ownership' =>  $request->ownership,
                'fuel' =>  $request->fuel,
            ];

            $transport = Transport::create($data);

            DB::commit();


            return $this->sendResponse($transport, 'Transport Data created Successfully');
        } catch (\Exception $e) {
            DB::rollback();

            return $this->sendError('An error occurred while storing Transport Data: ' . $e->getMessage(), null, 500);
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
            $transport = Transport::select('transport.id', 'transport.name', 'transport.type', 'transport.ownership', 'transport.fuel')->where('id', $id)
                ->first();

            if (!$transport) {
                return $this->sendError('Data Not Found', null, 404);
            }

            return $this->sendResponse($transport, 'Successfully get Transport Data.');
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while getting Transport Data: ' . $e->getMessage(), null, 500);
        }
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
                'type' => 'required|string|max:255',
                'ownership' => 'required|string|max:255',
                'fuel' => 'required|max:255',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Error.', $validator->errors());
            }

            $transport = Transport::select('transport.id')->where('id', $id)->first();

            if (!$transport) {
                return $this->sendError('Transport Data Not Found', null, 404);
            }

            $data = [
                'name' => $request->name,
                'type' =>  $request->type,
                'ownership' =>  $request->ownership,
                'fuel' =>  $request->fuel,
            ];

            $transport->update($data);

            DB::commit();


            return $this->sendResponse($transport, 'Transport Data Updated Successfully');
        } catch (\Exception $e) {
            DB::rollback();
            return $this->sendError('An error occurred while updating Transport Data: ' . $e->getMessage(), null, 500);
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
            $transport = Transport::select('transport.id')->where('id', $id)->first();

            if (!$transport) {
                DB::rollback();
                return $this->sendError('Transport Data not found', null, 404);
            }

            $transport->delete();
            DB::commit();

            return $this->sendResponse(null, 'Transport Data Deleted Successfully');
        } catch (\Exception $e) {
            DB::rollback();
            return $this->sendError('An error occurred while deleting Transport Data: ' . $e->getMessage(), null, 500);
        }
    }

    public function getName()
    {
        try {
            $transports = Transport::select('transport.id', 'transport.name')->get();

            if ($transports->isEmpty()) {
                return $this->sendError('Data Not Found', null, 404);
            }

            return $this->sendResponse($transports, 'Successfully get Transport List.');
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while getting Transport List: ' . $e->getMessage(), null, 500);
        }
    }

    public function filterData($keyword)
    {
        try {
            $results = Transport::query()
                ->where(function ($query) use ($keyword) {
                    $query->where('name', 'like', "%$keyword%")
                        ->orWhere('type', 'like', "%$keyword%")
                        ->orWhere('ownership', 'like', "%$keyword%")
                        ->orWhere('fuel', 'like', "%$keyword%");
                })
                ->select('transport.id', 'transport.name', 'transport.type', 'transport.ownership', 'transport.fuel')
                ->paginate();

            return $this->sendResponse($results, 'Successfully retrieved Transport Data.');
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while getting Transport data: ' . $e->getMessage(), null, 500);
        }
    }

    public function exportData(Request $request)
    {
        try {
            $keyword = $request->keyword;

            $query = Transport::query()
            ->select('transport.id', 'transport.name', 'transport.type', 'transport.ownership', 'transport.fuel');

            if (isset($keyword) && !empty($keyword)) {
                $query->where(function ($query) use ($keyword) {
                    $query->where('name', 'like', "%$keyword%")
                        ->orWhere('type', 'like', "%$keyword%")
                        ->orWhere('ownership', 'like', "%$keyword%")
                        ->orWhere('fuel', 'like', "%$keyword%");
                });
            };

            $transport = $query->paginate(1000);

            if ($transport->isEmpty()) {
                return $this->sendError('Data Not Found', null, 404);
            }

            return $this->sendResponse($transport, 'Successfully get Transport.');
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while exporting Transport.: ' . $e->getMessage(), null, 500);
        }
    }
}
