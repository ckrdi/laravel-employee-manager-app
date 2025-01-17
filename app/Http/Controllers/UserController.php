<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Position;
use App\Models\Unit;
use App\Models\User;
use App\Models\UserPosition;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $units = DB::table('units')
            ->selectRaw('id as value, name as label')
            ->get();

        $positions = DB::table('positions')
            ->selectRaw('id as value, name as label')
            ->get();

        $user_positions = DB::table('user_position')
            ->get();

        $users = DB::table('users')
            ->select('id', 'name', 'username', 'unit_id', 'join_date')
            ->get();

        foreach ($users as $user) {
            $unitId = $user->unit_id;
            if ($unitId != null) {
                $findUnits = $units->first(fn($item) => $item->value == $unitId);
                if ($findUnits != null) {
                    $user->unit_name = $findUnits->label;
                }
            }

            $user_positions_filter = $user_positions->filter(fn($item) => $item->user_id == $user->id);
            if ($user_positions_filter->count() > 0) {
                $positionsArr = collect([]);
                foreach ($user_positions_filter as $position) {
                    $findPosition = $positions->first(fn($item) => $item->value == $position->position_id);
                    if ($findPosition != null) {
                        $positionsArr->push($findPosition);
                    }
                }

                $user->positions = $positionsArr;
            }
        }

        return Inertia::render('User/UserIndex', [
            'employees' => $users,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $units = DB::table('units')
            ->selectRaw('id as value, name as label')
            ->get();

        $positions = DB::table('positions')
            ->selectRaw('id as value, name as label')
            ->get();

        return Inertia::render('User/UserAdd', [
            'unit_options' => $units,
            'position_options' => $positions,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if ($request->is_new_unit) {
            $request->validate([
                'unit_name' => ['required', 'unique:units,name'],
            ]);
        }

        if ($request->is_new_position) {
            $request->validate([
                'position_name' => ['required', 'unique:positions,name'],
            ]);
        }

        $request->validate([
            'name' => ['required', 'string'],
            'username' => ['required', 'alpha_dash', 'unique:users'],
            'password' => ['required'],
            'unit_id' => ['integer', 'nullable'],
            'position_ids' => ['array', 'min:0', 'max:2'],
            'join_date' => ['date', 'nullable'],
        ]);

        $user = User::create([
            'name' => $request->name,
            'username' => $request->username,
            'password' => Hash::make($request->password),
            'unit_id' => $request->unit_id ?? null,
            'join_date' => $request->join_date ?? null,
        ]);

        $unit = null;
        if ($request->is_new_unit) {
            $unit = Unit::create([
                'name' => $request->unit_name,
            ]);
        }

        if ($unit != null) {
            $user->update([
                'unit_id' => $unit->id,
            ]);
        }

        $position = null;
        if ($request->is_new_position) {
            $position = Position::create([
                'name' => $request->position_name,
            ]);
        }

        if ($position != null) {
            UserPosition::create([
                'user_id' => $user->id,
                'position_id' => $position->id,
            ]);
        }

        if (count($request->position_ids) > 0 && $position == null) {
            foreach ($request->position_ids as $position_id) {
                UserPosition::create([
                    'user_id' => $user->id,
                    'position_id' => $position_id,
                ]);
            }
        }

        return Redirect::route('users');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $user = User::where('id', $id)->first();

        $units = DB::table('units')
            ->selectRaw('id as value, name as label')
            ->get();

        $positions = DB::table('positions')
            ->selectRaw('id as value, name as label')
            ->get();

        $user_positions = DB::table('user_position')
            ->where('user_id', $user->id)
            ->get();

        $unitId = $user->unit_id;
        if ($unitId != null) {
            $findUnits = $units->first(fn($item) => $item->value == $unitId);
            if ($findUnits != null) {
                $user->unit = $findUnits;
            }
        }

        if ($user_positions->count() > 0) {
            $positionsArr = collect([]);
            foreach ($user_positions as $position) {
                $findPosition = $positions->first(fn($item) => $item->value == $position->position_id);
                if ($findPosition != null) {
                    $positionsArr->push($findPosition);
                }
            }

            $user->positions = $positionsArr;
        }

        return Inertia::render('User/UserEdit', [
            'employee' => $user,
            'unit_options' => $units,
            'position_options' => $positions,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => ['required', 'string'],
            'unit_id' => ['integer', 'nullable'],
            'position_ids' => ['array', 'min:0', 'max:2'],
            'join_date' => ['date', 'nullable'],
        ]);

        $user = User::where('id', $id)->first();

        $user->update([
            'name' => $request->name,
            'unit_id' => $request->unit_id ?? null,
            'join_date' => $request->join_date ?? null,
        ]);

        if (count($request->position_ids) > 0) {
            UserPosition::where('user_id', $user->id)->delete();

            foreach ($request->position_ids as $position_id) {
                UserPosition::create([
                    'user_id' => $user->id,
                    'position_id' => $position_id,
                ]);
            }
        }

        return Redirect::route('users');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::where('id', $id)->first();

        $user->delete();

        return Redirect::route('users');
    }
}
