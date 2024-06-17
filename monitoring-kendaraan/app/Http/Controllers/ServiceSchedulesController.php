<?php

namespace App\Http\Controllers;

use App\Models\ServiceSchedules;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ServiceSchedulesController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $service = ServiceSchedules::select('service_schedules.id', 'service_schedules.transport_id', 'service_schedules.date', 'service_schedules.service_description', 'service_schedules.created_at', 'service_schedules.updated_at')->with('transport')->paginate();

            if (!$service) {
                return $this->sendError('Data Not Found', null, 404);
            }
            return $this->sendResponse($service, 'Successfully get Service Schedule List.');
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while getting Service Schedule List: ' . $e->getMessage(), null, 500);
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
                'transport_id' => 'required|exists:transport,id',
                'date' => 'required',
                'service_description' => 'required',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Error.', $validator->errors());
            }

            $data = [
                'transport_id' => $request->transport_id,
                'date' =>  $request->date,
                'service_description' => $request->service_description,
            ];

            $service = ServiceSchedules::create($data);

            DB::commit();

            return $this->sendResponse($service, 'Service Schedule Data create Successfully');
        } catch (\Exception $e) {
            DB::rollback();
            return $this->sendError('An error occurred while storing Service Schedule Data: ' . $e->getMessage(), null, 500);
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
            $service = ServiceSchedules::select('service_schedules.id', 'service_schedules.transport_id', 'service_schedules.date', 'service_schedules.service_description', 'service_schedules.created_at', 'service_schedules.updated_at')
                ->with('transport')
                ->where('id', $id)
                ->first();

            if (!$service) {
                return $this->sendError('Data Not Found', null, 404);
            }

            return $this->sendResponse($service, 'Successfully get Service Schedule Data.');
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while get getting  Service Schedule data: ' . $e->getMessage(), null, 500);
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
                'transport_id' => 'required|exists:transport,id',
                'date' => 'required',
                'service_description' => 'required',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Error.', $validator->errors());
            }

            $service = ServiceSchedules::select('service_schedules.id')->where('id', $id)->first();

            if (!$service) {
                return $this->sendError('Service Schedule Data Not Found', null, 404);
            }

            $data = [
                'transport_id' => $request->transport_id,
                'date' =>  $request->date,
                'service_description' => $request->service_description,
            ];

            $service->update($data);

            DB::commit();

            return $this->sendResponse($service, 'Service Schedule Updated Successfully');
        } catch (\Exception $e) {
            DB::rollback();
            return $this->sendError('An error occurred while updatting Service Schedule Data: ' . $e->getMessage(), null, 500);
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
        try {
            $service = ServiceSchedules::find($id);

            if (!$service) {
                return $this->sendError('Data not found.', null, 404);
            }

            $service->delete();

            return $this->sendResponse(null, 'Service Schedule data deleted successfully.');
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while deleting Service Schedule data: ' . $e->getMessage(), null, 500);
        }
    }

    public function filterData($keyword)
    {
        try {
            $results = ServiceSchedules::query()
                ->leftJoin('transport', 'service_schedules.transport_id', '=', 'transport.id')
                ->where(function ($query) use ($keyword) {
                    $query->where('service_description', 'like', "%$keyword%")
                        ->orWhere('date', 'like', "%$keyword%")
                        ->orWhere('transport.name', 'like', "%$keyword%");
                })
                ->with([
                    'transport'
                ])
                ->select('service_schedules.id', 'service_schedules.transport_id', 'service_schedules.date', 'service_schedules.service_description', 'service_schedules.created_at', 'service_schedules.updated_at')
                ->paginate();

            return $this->sendResponse($results, 'Successfully retrieved Service Schedule.');
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while getting Service Schedule: ' . $e->getMessage(), null, 500);
        }
    }

    public function exportData(Request $request)
    {
        try {
            $keyword = $request->keyword;

            $query = ServiceSchedules::query()
                ->with(['transport'])->leftJoin('transport', 'service_schedules.transport_id', '=', 'transport.id');

            if (isset($keyword) && !empty($keyword)) {
                $query->where(function ($query) use ($keyword) {
                    $query->where('service_description', 'like', "%$keyword%")
                        ->orWhere('date', 'like', "%$keyword%")
                        ->orWhere('transport.name', 'like', "%$keyword%");
                });
            }

            $query->select('service_schedules.id', 'service_schedules.transport_id', 'service_schedules.date', 'service_schedules.service_description', 'service_schedules.created_at', 'service_schedules.updated_at');

            $serviceSchedule = $query->paginate(1000);

            if ($serviceSchedule->isEmpty()) {
                return $this->sendError('Data Not Found', null, 404);
            }

            return $this->sendResponse($serviceSchedule, 'Successfully get Service Schedule.');
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while exporting Service Schedule.: ' . $e->getMessage(), null, 500);
        }
    }

    public function ServiceToday()
{
    try {
        $today = date('Y-m-d');

        $results = ServiceSchedules::query()
            ->whereDate('service_schedules.date', $today)
            ->with([
                'transport'
            ])
            ->select('service_schedules.id', 'service_schedules.transport_id', 'service_schedules.date', 'service_schedules.service_description', 'service_schedules.created_at', 'service_schedules.updated_at')
            ->paginate();

            if($results->isEmpty()){
                return $this->sendError('Data Not Found', null, 404);
            }

        return $this->sendResponse($results, 'Successfully retrieved Service Schedule.');
    } catch (\Exception $e) {
        return $this->sendError('An error occurred while getting Service Schedule: ' . $e->getMessage(), null, 500);
    }
}

}
