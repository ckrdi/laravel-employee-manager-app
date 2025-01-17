<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $id = Auth::id();
        $login_sum = DB::table('users')
            ->join('logins', 'users.id', '=', 'logins.user_id')
            ->select('users.id')
            ->where('users.id', '=', $id)
            ->groupBy('users.id')
            ->count();

        $top_logins = DB::table('users')
            ->join('logins', 'users.id', '=', 'logins.user_id')
            ->selectRaw('users.id, users.username, users.name, count(users.id) as login_count')
            ->groupBy('users.id')
            ->having('login_count', '>', 25)
            ->get();

        return Inertia::render('Dashboard',[
            'employee_sum' => DB::table('users')->count() ?? 0,
            'login_sum' => $login_sum ?? 0,
            'unit_sum' => DB::table('units')->count() ?? 0,
            'position_sum' => DB::table('positions')->count() ?? 0,
            'top_logins' => $top_logins,
        ]);
    }
}
