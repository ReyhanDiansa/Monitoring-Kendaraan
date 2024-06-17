<?php

namespace App\Http\Controllers;

use App\Models\FuelConsumptions;
use App\Models\Transport;
use App\Models\UsageHistories;
use App\Models\UsageRequest;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class UsageHistoriesController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $usageHistories = UsageHistories::select('usage_histories.id', 'usage_histories.request_id', 'usage_histories.fuel_consumption_id', 'usage_histories.created_at', 'usage_histories.updated_at')->leftJoin('usage_request', 'usage_histories.request_id', '=', 'usage_request.id')->with('usageRequest.transport', 'usageRequest.driver', 'fuel')->orderBy('usage_request.usage_start', 'desc')->paginate();

            if (!$usageHistories) {
                return $this->sendError('Data Not Found', null, 404);
            }
            return $this->sendResponse($usageHistories, 'Successfully get Usage Histories List.');
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while getting Usage Histories List: ' . $e->getMessage(), null, 500);
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
                'request_id' => 'required|exists:usage_request,id',
                'fuel_consumption_id' => 'required|exists:fuel_consumptions,id'
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Error.', $validator->errors());
            }

            $data = [
                'request_id' => $request->request_id,
                'fuel_consumption_id' => $request->fuel_consumption_id,
            ];

            $usageHistories = UsageHistories::create($data);

            DB::commit();

            return $this->sendResponse($usageHistories, 'Usage Histories Data create Successfully');
        } catch (\Exception $e) {
            DB::rollback();
            return $this->sendError('An error occurred while storing Usage Histories Data: ' . $e->getMessage(), null, 500);
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
            $usageHistories = UsageHistories::select('usage_histories.id', 'usage_histories.request_id', 'usage_histories.fuel_consumption_id', 'usage_histories.created_at', 'usage_histories.updated_at')->with('usageRequest.transport', 'usageRequest.driver', 'fuel')
                ->where('id', $id)
                ->first();

            if (!$usageHistories) {
                return $this->sendError('Data Not Found', null, 404);
            }

            return $this->sendResponse($usageHistories, 'Successfully get Usage Histories Data.');
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while get getting  Usage Histories data: ' . $e->getMessage(), null, 500);
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
                'request_id' => 'required|exists:usage_request,id',
                'fuel_consumption_id' => 'required|exists:fuel_consumptions,id'
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Error.', $validator->errors());
            }

            $usageHitories = UsageHistories::select('usage_histories.id')->where('id', $id)->first();

            if (!$usageHitories) {
                return $this->sendError('Usage Histories Data Not Found', null, 404);
            }

            $data = [
                'request_id' => $request->request_id,
                'fuel_consumption_id' => $request->fuel_consumption_id,
            ];

            $usageHitories->update($data);

            DB::commit();

            return $this->sendResponse($usageHitories, 'Usage Histories Updated Successfully');
        } catch (\Exception $e) {
            DB::rollback();
            return $this->sendError('An error occurred while updatting Usage Histories Data: ' . $e->getMessage(), null, 500);
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
            $usageHistories = UsageHistories::find($id);

            if (!$usageHistories) {
                return $this->sendError('Data not found.', null, 404);
            }

            $usageHistories->delete();

            return $this->sendResponse(null, 'Usage Histories data deleted successfully.');
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while deleting Usage Histories data: ' . $e->getMessage(), null, 500);
        }
    }

    public function pelaporanPemakaian(Request $request, $id)
    {
        DB::beginTransaction();

        try {
            $validator = Validator::make($request->all(), [
                'final_amount' => 'required',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Error.', $validator->errors());
            }

            $usageRequest = UsageRequest::select('usage_request.id', 'usage_request.transport_id', 'usage_request.usage_status')->with('transport')->where('id', $id)->first();

            if (!$usageRequest) {
                DB::rollback();
                return $this->sendError('Usage Request Not Found', null, 404);
            }

            $now = Carbon::now();
            $formattedDateTime = $now->format('Y-m-d H:i:s');

            $fuelData = [
                'date' => $formattedDateTime,
                'start_amount' => $usageRequest['transport']['fuel'],
                'final_amount' => $request->final_amount,
            ];

            $createFuel = FuelConsumptions::create($fuelData);

            $usageStatus = [
                'usage_status' => 'sudah_digunakan'
            ];

            $usageRequest->update($usageStatus);

            $history = [
                'request_id' => $id,
                'fuel_consumption_id' => $createFuel->id
            ];

            $createHistory = UsageHistories::create($history);

            $updateFuel = [
                'fuel' => $request->final_amount
            ];

            $findTransport = Transport::select('transport.id', 'transport.fuel')->where('id', $usageRequest->transport_id)->first();

            $findTransport->update($updateFuel);

            DB::commit();

            return $this->sendResponse($createHistory, 'Successfully Report.');
        } catch (\Exception $e) {
            DB::rollback();
            return $this->sendError('An error occurred while storing Report Data: ' . $e->getMessage(), null, 500);
        }
    }

    public function filterData($keyword)
    {
        try {
            $results = UsageHistories::query()
                ->leftJoin('usage_request', 'usage_histories.request_id', '=', 'usage_request.id')
                ->leftJoin('transport', 'usage_request.transport_id', '=', 'transport.id')
                ->leftJoin('driver', 'usage_request.driver_id', '=', 'driver.id')
                ->leftJoin('fuel_consumptions', 'usage_histories.fuel_consumption_id', '=', 'fuel_consumptions.id')
                ->where(function ($query) use ($keyword) {
                    $query->where('transport.name', 'like', "%$keyword%")
                        ->orWhere('usage_request.usage_start', 'like', "%$keyword%")
                        ->orWhere('usage_request.usage_description', 'like', "%$keyword%")
                        ->orWhere('usage_request.usage_final', 'like', "%$keyword%")
                        ->orWhere('driver.name', 'like', "%$keyword%")
                        ->orWhere('fuel_consumptions.start_amount', 'like', "%$keyword%")
                        ->orWhere('fuel_consumptions.final_amount', 'like', "%$keyword%");
                })
                ->with('usageRequest.transport', 'usageRequest.driver', 'fuel')
                ->select('usage_histories.id', 'usage_histories.request_id', 'usage_histories.fuel_consumption_id', 'usage_histories.created_at', 'usage_histories.updated_at')->orderBy('usage_request.usage_start', 'desc')
                ->paginate();

            return $this->sendResponse($results, 'Successfully retrieved Usage Histories.');
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while getting  Usage Histories: ' . $e->getMessage(), null, 500);
        }
    }

    public function exportData(Request $request)
    {
        try {
            $keyword = $request->keyword;

            $query = UsageHistories::query()
                ->with('usageRequest.transport', 'usageRequest.driver', 'fuel')->leftJoin('usage_request', 'usage_histories.request_id', '=', 'usage_request.id')->leftJoin('transport', 'usage_request.transport_id', '=', 'transport.id')
                ->leftJoin('driver', 'usage_request.driver_id', '=', 'driver.id')
                ->leftJoin('fuel_consumptions', 'usage_histories.fuel_consumption_id', '=', 'fuel_consumptions.id');

            if (isset($keyword) && !empty($keyword)) {
                $query->where(function ($query) use ($keyword) {
                        $query->where('transport.name', 'like', "%$keyword%")
                        ->orWhere('usage_request.usage_start', 'like', "%$keyword%")
                        ->orWhere('usage_request.usage_description', 'like', "%$keyword%")
                        ->orWhere('usage_request.usage_final', 'like', "%$keyword%")
                        ->orWhere('driver.name', 'like', "%$keyword%")
                        ->orWhere('fuel_consumptions.start_amount', 'like', "%$keyword%")
                        ->orWhere('fuel_consumptions.final_amount', 'like', "%$keyword%");
                    });
            }

            $query->select('usage_histories.id', 'usage_histories.request_id', 'usage_histories.fuel_consumption_id', 'usage_histories.created_at', 'usage_histories.updated_at')->orderBy('usage_request.usage_start', 'desc');

            $history = $query->paginate(1000);

            if ($history->isEmpty()) {
                return $this->sendError('Data Not Found', null, 404);
            }

            return $this->sendResponse($history, 'Successfully get Usage Histories.');
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while exporting Usage Histories.: ' . $e->getMessage(), null, 500);
        }
    }

    public function getDailyCounts()
    {
        $dailyCounts = DB::table('usage_histories')
            ->leftJoin('usage_request', 'usage_histories.request_id', '=', 'usage_request.id')
            ->select(DB::raw('DATE(usage_request.usage_start) as date'), DB::raw('count(*) as count'))
            ->groupBy(DB::raw('DATE(usage_request.usage_start)'))
            ->orderBy('date', 'desc')
            ->get();

        return $this->sendResponse($dailyCounts, 'Successfully get Histories.');
    }

    public function getMonthlyCounts()
    {
        $monthlyCounts = DB::table('usage_histories')
            ->leftJoin('usage_request', 'usage_histories.request_id', '=', 'usage_request.id')
            ->select(DB::raw('DATE_FORMAT(usage_request.usage_start, "%Y-%m") as month'), DB::raw('count(*) as count'))
            ->groupBy(DB::raw('DATE_FORMAT(usage_request.usage_start, "%Y-%m")'))
            ->orderBy('month', 'desc')
            ->get();

        return $this->sendResponse($monthlyCounts, 'Successfully get Histories.');

    }


}
