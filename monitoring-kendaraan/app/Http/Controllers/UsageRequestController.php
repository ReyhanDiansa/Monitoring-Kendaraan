<?php

namespace App\Http\Controllers;

use App\Models\RequestDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\UserRequest;
use App\Models\UserRequestDetail;
use App\Models\UsageRequest;
use Illuminate\Support\Facades\DB;

class UsageRequestController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $usageRequests = UsageRequest::select('usage_request.id', 'usage_request.transport_id', 'usage_request.driver_id',  'usage_request.usage_start', 'usage_request.usage_final', 'usage_request.usage_status', 'usage_request.usage_description', 'usage_request.request_status', 'usage_request.created_at',  'usage_request.updated_at')->with('detail.approver', 'transport', 'driver', 'history')->orderBy('usage_request.usage_start', 'desc')->paginate();

            if (!$usageRequests) {
                return $this->sendError('Data Not Found', null, 404);
            }

            return $this->sendResponse($usageRequests, 'Successfully get Usage Request List.');
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while fetching Usage requests: ' . $e->getMessage()], 500);
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
            // Validate request data
            $validator = Validator::make($request->all(), [
                'transport_id' => 'required|exists:transport,id',
                'driver_id' => 'required|exists:driver,id',
                'usage_start' => 'required|date',
                'usage_final' => 'required|date|after_or_equal:usage_start',
                'usage_description' => 'required|string|max:255',
                'approvers' => 'required|array|min:2',
                'approvers.*' => 'exists:users,id',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Error.', $validator->errors());
            }

            // Check for overlapping usage periods
            $existingUsageRequest = UsageRequest::select('usage_request.id')->where('transport_id', $request->transport_id)
                ->where(function ($query) use ($request) {
                    $query->where(function ($q) use ($request) {
                        $q->where('usage_start', '<=', $request->usage_start)
                            ->where('usage_final', '>=', $request->usage_start);
                    })->orWhere(function ($q) use ($request) {
                        $q->where('usage_start', '<=', $request->usage_final)
                            ->where('usage_final', '>=', $request->usage_final);
                    })->orWhere(function ($q) use ($request) {
                        $q->where('usage_start', '>=', $request->usage_start)
                            ->where('usage_final', '<=', $request->usage_final);
                    });
                })
                ->first();

            if ($existingUsageRequest) {
                return $this->sendError('There is already a usage request for this transport with overlapping period.');
            }

            $data = [
                'transport_id' => $request->transport_id,
                'driver_id' => $request->driver_id,
                'usage_start' => $request->usage_start,
                'usage_final' => $request->usage_final,
                'usage_description' => $request->usage_description,
            ];


            $usageRequest = UsageRequest::create($data);

            foreach ($request->approvers as $approverId) {
                RequestDetail::create([
                    'request_id' => $usageRequest->id,
                    'approver_id' => $approverId,
                ]);
            }

            DB::commit();

            return $this->sendResponse($usageRequest, 'Usage Request created successfully.');
        } catch (\Exception $e) {
            DB::rollback();

            return $this->sendError('An error occurred while storing Usage Request: ' . $e->getMessage(), null, 500);
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
            $usageRequest = UsageRequest::select('usage_request.id', 'usage_request.transport_id', 'usage_request.driver_id',  'usage_request.usage_start', 'usage_request.usage_final', 'usage_request.usage_status', 'usage_request.usage_description', 'usage_request.request_status', 'usage_request.created_at',  'usage_request.updated_at')->with('detail.approver', 'transport', 'driver', 'history')->findOrFail($id);

            return $this->sendResponse($usageRequest, 'Successfully get Usage Request Data.');
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while get getting  Usage Request Data: ' . $e->getMessage(), null, 500);
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
        try {

            $validator = Validator::make($request->all(), [
                'transport_id' => 'exists:transport,id',
                'driver_id' => 'exists:driver,id',
                'usage_description' => 'string|max:255',
                'approvers' => 'array|min:2',
                'approvers.*' => 'exists:users,id',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Error.', $validator->errors());
            }

            $usageRequest = UsageRequest::select('usage_request.id')->where('id', $id)->first();

            if (!$usageRequest) {
                return $this->sendError('Usage Request Not Found', null, 404);
            }

            $data = [
                'transport_id' => $request->transport_id,
                'driver_id' => $request->driver_id,
                'usage_start' => $request->usage_start,
                'usage_final' => $request->usage_final,
                'usage_description' => $request->usage_description,
            ];

            $usageRequest->update($data);

            if ($request->has('approvers')) {
                $usageDetail = RequestDetail::select('request_detail.id')->where('request_id', $usageRequest->id);

                if (!$usageDetail) {
                    DB::rollback();
                    return $this->sendError('Usage Detail not found', null, 404);
                }

                $usageDetail->delete();

                foreach ($request->approvers as $approverId) {
                    RequestDetail::create([
                        'request_id' => $usageRequest->id,
                        'approver_id' => $approverId,
                    ]);
                }
            }
            DB::commit();

            return $this->sendResponse($usageRequest, 'Usage Request updated successfully.');
        } catch (\Exception $e) {
            DB::rollback();
            return $this->sendError('An error occurred while updating Usage Request: ' . $e->getMessage(), null, 500);
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
            $usageDetail = RequestDetail::select('request_detail.id')->where('request_id', $id);

            if (!$usageDetail) {
                DB::rollback();
                return $this->sendError('Usage Detail not found', null, 404);
            }

            $usageDetail->delete();

            $usageRequest = UsageRequest::select('usage_request.id')->where('id', $id)->first();

            if (!$usageRequest) {
                DB::rollback();
                return $this->sendError('Usage Request not found', null, 404);
            }

            $usageRequest->delete();
            DB::commit();

            return $this->sendResponse(null, 'Usage Request Data Deleted Successfully');
        } catch (\Exception $e) {
            DB::rollback();

            return response()->json(['error' => 'An error occurred while deleting user request: ' . $e->getMessage()], 500);
        }
    }

    public function showForApprover($id)
    {
        try {
            $approverId = auth()->id();
            $requestId = $id;

            $findRequest = UsageRequest::select('usage_request.id')->where('id', $requestId)->first();


            if (!$findRequest) {
                return $this->sendError('Usage Request not found', null, 400);
            }

            $findUserRequest = RequestDetail::select('request_detail.id')->where('request_id', $requestId)->where('approver_id', $approverId)->first();

            if (!$findUserRequest) {
                return $this->sendError('Usage Request with that approver is not found', null, 400);
            }

            $previousApproval = RequestDetail::where('request_id', $requestId)
                ->where('id', '<', $findUserRequest->id)
                ->orderBy('id', 'desc')
                ->first();

            if ($previousApproval !== null && $previousApproval['status'] !== 'approve') {
                return $this->sendError('There is no request for you to approve / approver before you have not or did not approve', null, 400);
            }

            $usageRequest = UsageRequest::select('usage_request.id', 'usage_request.transport_id', 'usage_request.driver_id',  'usage_request.usage_start', 'usage_request.usage_final', 'usage_request.usage_description', 'usage_request.created_at',  'usage_request.updated_at')->with([
                'detail' => function ($query) use ($approverId) {
                    $query->where('approver_id', $approverId);
                },
                'detail.approver', 'transport', 'driver'
            ])->where('id', $requestId)->first();

            return $this->sendResponse($usageRequest, 'Successfully get Usage Request Data.');
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while deleting user request: ' . $e->getMessage()], 500);
        }
    }

    public function ApproveReject(Request $request, $id)
    {
        DB::beginTransaction();

        try {
            $approverId = auth()->id();
            $validator = Validator::make($request->all(), [
                'status' => 'required|string',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Error.', $validator->errors());
            }

            $findRequest = UsageRequest::select('id', 'request_status')->where('id', $id)->first();

            if (!$findRequest) {
                return $this->sendError('Usage Request not found', null, 400);
            }

            $findUserRequest = RequestDetail::select('id', 'status', 'approver_id')
                ->where('request_id', $id)
                ->where('approver_id', $approverId)
                ->first();

            if (!$findUserRequest) {
                return $this->sendError('Usage Request with that approver is not found', null, 400);
            }

            $previousApproval = RequestDetail::where('request_id', $id)
                ->where('id', '<', $findUserRequest->id)
                ->orderBy('id', 'desc')
                ->first();

            if ($previousApproval !== null && $previousApproval['status'] !== 'approve') {
                return $this->sendError('There is no request for you to approve / approver before you have not or did not approve', null, 400);
            }

            $findUserRequest->update(['status' => $request->status]);

            $nextApproval = RequestDetail::where('request_id', $id)
                ->where('id', '>', $findUserRequest->id)
                ->orderBy('id', 'desc')
                ->first();

            if ($nextApproval === null || $request->status === 'reject') {
                $findRequest->update(['request_status' => $request->status]);
            }

            DB::commit();

            return $this->sendResponse($findUserRequest, 'Data ' . $request->status . ' successfully.');
        } catch (\Exception $e) {
            DB::rollback();
            return $this->sendError('An error occurred while updating Usage Request: ' . $e->getMessage(), null, 500);
        }
    }


    public function UpdateUsageStatus(Request $request, $id)
    {
        DB::beginTransaction();

        try {

            $validator = Validator::make($request->all(), [
                'usage_status' => 'required|string',
            ]);

            if ($validator->fails()) {
                return $this->sendError('Validation Error.', $validator->errors());
            }

            $findUsageRequest = UsageRequest::select('usage_request.id', 'usage_request.usage_status')->where('id', $id)->first();

            $data = [
                'usage_status' => $request->usage_status
            ];

            $findUsageRequest->update($data);

            DB::commit();

            return $this->sendResponse($findUsageRequest, 'Usage Request created successfully.');
        } catch (\Exception $e) {
            DB::rollback();

            return $this->sendError('An error occurred while storing Usage Request: ' . $e->getMessage(), null, 500);
        }
    }

    public function filterData($keyword)
    {
        try {
            $results = UsageRequest::query()
                ->leftJoin('transport', 'usage_request.transport_id', '=', 'transport.id')
                ->leftJoin('driver', 'usage_request.driver_id', '=', 'driver.id')
                ->where(function ($query) use ($keyword) {
                    $query->where('usage_status', 'like', "%$keyword%")
                        ->orWhere('request_status', 'like', "%$keyword%")
                        ->orWhere('transport.name', 'like', "%$keyword%")
                        ->orWhere('usage_start', 'like', "%$keyword%")
                        ->orWhere('usage_description', 'like', "%$keyword%")
                        ->orWhere('usage_final', 'like', "%$keyword%")
                        ->orWhere('driver.name', 'like', "%$keyword%");
                })
                ->with('detail.approver', 'transport', 'driver', 'history')
                ->select('usage_request.id', 'usage_request.transport_id', 'usage_request.driver_id',  'usage_request.usage_start', 'usage_request.usage_final', 'usage_request.usage_status', 'usage_request.usage_description', 'usage_request.request_status', 'usage_request.created_at',  'usage_request.updated_at')
                ->orderBy('usage_request.usage_start', 'desc')->paginate();

            return $this->sendResponse($results, 'Successfully retrieved Usage Request.');
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while getting  Usage Request: ' . $e->getMessage(), null, 500);
        }
    }

    public function exportData(Request $request)
    {
        try {
            $keyword = $request->keyword;

            $query = UsageRequest::query()
                ->with('detail.approver', 'transport', 'driver', 'history')->leftJoin('transport', 'usage_request.transport_id', '=', 'transport.id')
                ->leftJoin('driver', 'usage_request.driver_id', '=', 'driver.id');

            if (isset($keyword) && !empty($keyword)) {
                $query->where(function ($query) use ($keyword) {
                        $query->where('usage_status', 'like', "%$keyword%")
                            ->orWhere('request_status', 'like', "%$keyword%")
                            ->orWhere('transport.name', 'like', "%$keyword%")
                            ->orWhere('usage_start', 'like', "%$keyword%")
                            ->orWhere('usage_description', 'like', "%$keyword%")
                            ->orWhere('usage_final', 'like', "%$keyword%")
                            ->orWhere('driver.name', 'like', "%$keyword%");
                    });
            }

            $query->select('usage_request.id', 'usage_request.transport_id', 'usage_request.driver_id',  'usage_request.usage_start', 'usage_request.usage_final', 'usage_request.usage_status', 'usage_request.usage_description', 'usage_request.request_status', 'usage_request.created_at',  'usage_request.updated_at')->orderBy('usage_request.usage_start', 'desc');

            $usageRequest = $query->paginate(1000);

            if ($usageRequest->isEmpty()) {
                return $this->sendError('Data Not Found', null, 404);
            }

            return $this->sendResponse($usageRequest, 'Successfully get Usage Request.');
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while exporting Usage Request.: ' . $e->getMessage(), null, 500);
        }
    }

    public function getAllForApprover()
    {
        try {
            $approverId = auth()->id();

            $findUserRequest = RequestDetail::select('request_detail.id')->where('approver_id', $approverId)->first();

            if (!$findUserRequest) {
                return $this->sendError('Usage Request with that approver is not found', null, 400);
            }

            $previousApproval = RequestDetail::where('id', '<', $findUserRequest->id)
                ->orderBy('id', 'desc')
                ->first();

            if ($previousApproval !== null && $previousApproval['status'] !== 'approve') {
                return $this->sendError('There is no request for you to approve / approver before you have not or did not approve', null, 400);
            }

            $usageRequest = UsageRequest::select('usage_request.id', 'usage_request.transport_id', 'usage_request.driver_id',  'usage_request.usage_start', 'usage_request.usage_final', 'usage_request.usage_description', 'usage_request.usage_status', 'usage_request.request_status', 'usage_request.created_at',  'usage_request.updated_at')->with([
                'detail' => function ($query) use ($approverId) {
                    $query->where('approver_id', $approverId);
                },
                'detail.approver', 'transport', 'driver'
            ])->orderBy('usage_request.usage_start', 'desc')->paginate();

            return $this->sendResponse($usageRequest, 'Successfully get Usage Request Data.');
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while deleting user request: ' . $e->getMessage()], 500);
        }
    }

    public function filterDataForApprover($keyword)
    {
        try {
            $approverId = auth()->id();

            $findUserRequest = RequestDetail::select('request_detail.id')->where('approver_id', $approverId)->first();

            if (!$findUserRequest) {
                return $this->sendError('Usage Request with that approver is not found', null, 400);
            }

            $previousApproval = RequestDetail::where('id', '<', $findUserRequest->id)
                ->orderBy('id', 'desc')
                ->first();

            if ($previousApproval !== null && $previousApproval['status'] !== 'approve') {
                return $this->sendError('There is no request for you to approve / approver before you have not or did not approve', null, 400);
            }

            $results = UsageRequest::query()
                ->leftJoin('transport', 'usage_request.transport_id', '=', 'transport.id')
                ->leftJoin('driver', 'usage_request.driver_id', '=', 'driver.id')
                ->where(function ($query) use ($keyword) {
                    $query->where('usage_status', 'like', "%$keyword%")
                        ->orWhere('request_status', 'like', "%$keyword%")
                        ->orWhere('transport.name', 'like', "%$keyword%")
                        ->orWhere('usage_start', 'like', "%$keyword%")
                        ->orWhere('usage_description', 'like', "%$keyword%")
                        ->orWhere('usage_final', 'like', "%$keyword%")
                        ->orWhere('driver.name', 'like', "%$keyword%");
                })
                ->with([
                    'detail' => function ($query) use ($approverId) {
                        $query->where('approver_id', $approverId);
                    },
                    'detail.approver', 'transport', 'driver', 'history'
                ])
                ->select('usage_request.id', 'usage_request.transport_id', 'usage_request.driver_id',  'usage_request.usage_start', 'usage_request.usage_final', 'usage_request.usage_status', 'usage_request.usage_description', 'usage_request.request_status', 'usage_request.created_at',  'usage_request.updated_at')
                ->orderBy('usage_request.usage_start', 'desc')->paginate();

            return $this->sendResponse($results, 'Successfully retrieved Usage Request.');
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while getting  Usage Request: ' . $e->getMessage(), null, 500);
        }
    }

    public function exportDataForApprover(Request $request)
    {
        try {
            $keyword = $request->keyword;
            $approverId = auth()->id();

            $findUserRequest = RequestDetail::select('request_detail.id')->where('approver_id', $approverId)->first();

            if (!$findUserRequest) {
                return $this->sendError('Usage Request with that approver is not found', null, 400);
            }

            $previousApproval = RequestDetail::where('id', '<', $findUserRequest->id)
                ->orderBy('id', 'desc')
                ->first();

            if ($previousApproval !== null && $previousApproval['status'] !== 'approve') {
                return $this->sendError('There is no request for you to approve / approver before you have not or did not approve', null, 400);
            }


            $query = UsageRequest::query()
                ->with([
                    'detail' => function ($query) use ($approverId) {
                        $query->where('approver_id', $approverId);
                    },
                    'detail.approver', 'transport', 'driver', 'history'
                ])->leftJoin('transport', 'usage_request.transport_id', '=', 'transport.id')
                ->leftJoin('driver', 'usage_request.driver_id', '=', 'driver.id');

            if (isset($keyword) && !empty($keyword)) {
                $query->where(function ($query) use ($keyword) {
                        $query->where('usage_status', 'like', "%$keyword%")
                            ->orWhere('request_status', 'like', "%$keyword%")
                            ->orWhere('transport.name', 'like', "%$keyword%")
                            ->orWhere('usage_start', 'like', "%$keyword%")
                            ->orWhere('usage_description', 'like', "%$keyword%")
                            ->orWhere('usage_final', 'like', "%$keyword%")
                            ->orWhere('driver.name', 'like', "%$keyword%");
                    });
            }

            $query->select('usage_request.id', 'usage_request.transport_id', 'usage_request.driver_id',  'usage_request.usage_start', 'usage_request.usage_final', 'usage_request.usage_status', 'usage_request.usage_description', 'usage_request.request_status', 'usage_request.created_at',  'usage_request.updated_at')->orderBy('usage_request.usage_start', 'desc');

            $usageRequest = $query->paginate(1000);

            if ($usageRequest->isEmpty()) {
                return $this->sendError('Data Not Found', null, 404);
            }

            return $this->sendResponse($usageRequest, 'Successfully get Usage Request.');
        } catch (\Exception $e) {
            return $this->sendError('An error occurred while exporting Usage Request.: ' . $e->getMessage(), null, 500);
        }
    }

}
