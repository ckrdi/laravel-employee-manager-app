<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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

        return Inertia::render('Dashboard', [
            'employee_sum' => DB::table('users')->count() ?? 0,
            'login_sum' => $login_sum ?? 0,
            'unit_sum' => DB::table('units')->count() ?? 0,
            'position_sum' => DB::table('positions')->count() ?? 0,
        ]);
    }

    public function get_top_logins(Request $request)
    {
        $query = DB::table('users')->join('logins', 'users.id', '=', 'logins.user_id');

        if ($request->start_date && $request->end_date) {
            $query->selectRaw('users.id, users.username, users.name, count(users.id) as login_count')
                ->whereBetween('login_datetime', [$request->start_date, $request->end_date])
                ->groupBy('users.id')
                ->having('login_count', '>=', $request->min_logins)
                ->orderBy('login_count', 'desc');
        }

        if (!$request->start_date || !$request->end_date) {
            $query->selectRaw('users.id, users.username, users.name, count(users.id) as login_count')
                ->groupBy('users.id')
                ->having('login_count', '>=', $request->min_logins)
                ->orderBy('login_count', 'desc');
        }

        return ['top_logins' => $query->get()->take(10)];
    }
}
