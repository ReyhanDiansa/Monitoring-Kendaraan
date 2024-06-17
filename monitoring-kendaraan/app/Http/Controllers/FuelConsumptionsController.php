<?php

namespace App\Http\Controllers;

use App\Models\FuelConsumptions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class FuelConsumptionsController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $fuel = FuelConsumptions::select('fuel_consumptions.id', 'fuel_consumptions.date', 'fuel_consumptions.start_amount', 'fuel_consumptions.final_amount', 'fuel_consumptions.created_at', 'fuel_consumptions.updated_at')->with('history.UsageRequest.transport', 'history.UsageRequest.driver')->paginate();

            if (!$fuel) {
                return $this->sendError('Data Not Found', null, 404);
            }
            return $this->sendResponse($fuel, 'Successfully get Fuel Consumption List.');
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while getting Fuel Consumption List: ' . $e->getMessage(), null, 500);
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
                'date' => 'required',
                'final_amount' => 'required',
                'start_amount' => 'required',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Error.', $validator->errors());
            }

            $data = [
                'date' =>  $request->date,
                'final_amount' => $request->final_amount,
                'start_amount' => $request->start_amount
            ];

            $fuel = FuelConsumptions::create($data);

            DB::commit();

            return $this->sendResponse($fuel, 'Fuel Consumptions Data create Successfully');
        } catch (\Exception $e) {
            DB::rollback();
            return $this->sendError('An error occurred while storing Fuel Consumptions Data: ' . $e->getMessage(), null, 500);
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
            $fuel = FuelConsumptions::select('fuel_consumptions.id', 'fuel_consumptions.date', 'fuel_consumptions.start_amount', 'fuel_consumptions.final_amount', 'fuel_consumptions.created_at', 'fuel_consumptions.updated_at')->with('history.UsageRequest.transport', 'history.UsageRequest.driver')
                ->where('id', $id)
                ->first();

            if (!$fuel) {
                return $this->sendError('Data Not Found', null, 404);
            }

            return $this->sendResponse($fuel, 'Successfully get Fuel Consumption Data.');
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while get getting  Fuel Consumption data: ' . $e->getMessage(), null, 500);
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
                'date' => 'required',
                'final_amount' => 'required',
                'start_amount' => 'required',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Error.', $validator->errors());
            }

            $fuel = FuelConsumptions::select('fuel_consumptions.id')->where('id', $id)->first();

            if (!$fuel) {
                return $this->sendError('Fuel Consumptions Data Not Found', null, 404);
            }

            $data = [
                'date' =>  $request->date,
                'final_amount' => $request->final_amount,
                'start_amount' => $request->start_amount
            ];

            $fuel->update($data);

            DB::commit();

            return $this->sendResponse($fuel, 'Fuel Consumptions Updated Successfully');
        } catch (\Exception $e) {
            DB::rollback();
            return $this->sendError('An error occurred while updatting Fuel Consumptions Data: ' . $e->getMessage(), null, 500);
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
            $fuel = FuelConsumptions::find($id);

            if (!$fuel) {
                return $this->sendError('Data not found.', null, 404);
            }

            $fuel->delete();

            return $this->sendResponse(null, 'Fuel Consumptions data deleted successfully.');
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while deleting Fuel Consumptions data: ' . $e->getMessage(), null, 500);
        }
    }

    public function filterData($keyword)
    {
        try {
            $results = FuelConsumptions::query()
                ->leftJoin('usage_histories', 'fuel_consumptions.id', '=', 'usage_histories.fuel_consumption_id')
                ->leftJoin('usage_request', 'usage_request.id', '=', 'usage_histories.request_id')
                ->leftJoin('transport', 'usage_request.transport_id', '=', 'transport.id')
                ->leftJoin('driver', 'usage_request.driver_id', '=', 'driver.id')
                ->where(function ($query) use ($keyword) {
                    $query->where('start_amount', 'like', "%$keyword%")
                        ->orWhere('final_amount', 'like', "%$keyword%")
                        ->orWhere('date', 'like', "%$keyword%")
                        ->orWhere('transport.name', 'like', "%$keyword%")
                        ->orWhere('driver.name', 'like', "%$keyword%");
                })
                ->with('history.UsageRequest.transport', 'history.UsageRequest.driver')
                ->select('fuel_consumptions.id', 'fuel_consumptions.date', 'fuel_consumptions.start_amount', 'fuel_consumptions.final_amount', 'fuel_consumptions.created_at', 'fuel_consumptions.updated_at')
                ->paginate();

            return $this->sendResponse($results, 'Successfully retrieved Fuel Consumption.');
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while getting Fuel Consumption: ' . $e->getMessage(), null, 500);
        }
    }

    public function exportData(Request $request)
    {
        try {
            $keyword = $request->keyword;

            $query = FuelConsumptions::query()
            ->with('history.UsageRequest.transport', 'history.UsageRequest.driver')->leftJoin('usage_histories', 'fuel_consumptions.id', '=', 'usage_histories.fuel_consumption_id')
            ->leftJoin('usage_request', 'usage_request.id', '=', 'usage_histories.request_id')
            ->leftJoin('transport', 'usage_request.transport_id', '=', 'transport.id')
            ->leftJoin('driver', 'usage_request.driver_id', '=', 'driver.id');

            if (isset($keyword) && !empty($keyword)) {
                $query->where(function ($query) use ($keyword) {
                    $query->where('start_amount', 'like', "%$keyword%")
                        ->orWhere('final_amount', 'like', "%$keyword%")
                        ->orWhere('date', 'like', "%$keyword%")
                        ->orWhere('transport.name', 'like', "%$keyword%")
                        ->orWhere('driver.name', 'like', "%$keyword%");
                });
            }

            $query->select('fuel_consumptions.id', 'fuel_consumptions.date', 'fuel_consumptions.start_amount', 'fuel_consumptions.final_amount', 'fuel_consumptions.created_at', 'fuel_consumptions.updated_at');

            $fuel = $query->paginate(1000);

            if ($fuel->isEmpty()) {
                return $this->sendError('Data Not Found', null, 404);
            }

            return $this->sendResponse($fuel, 'Successfully get Fuel Consumption.');
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while exporting Fuel Consumption.: ' . $e->getMessage(), null, 500);
        }
    }

    public function getDailyData()
    {
        $dailyData = FuelConsumptions::select(
            DB::raw('DATE(date) as date'),
            DB::raw('SUM(start_amount - final_amount) as count')
        )
        ->groupBy(DB::raw('DATE(date)'))
        ->orderBy('date')
        ->get();

        return $this->sendResponse($dailyData, 'Successfully get Fuel Consumption.');
    }

    public function getMonthlyData()
    {
        $monthlyData = FuelConsumptions::select(
            DB::raw('DATE_FORMAT(date, "%Y-%m") as month'),
            DB::raw('SUM(start_amount - final_amount) as count')
        )
        ->groupBy(DB::raw('DATE_FORMAT(date, "%Y-%m")'))
        ->orderBy('month')
        ->get();

        return $this->sendResponse($monthlyData, 'Successfully get Fuel Consumption.');
    }
}
