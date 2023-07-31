<?php

namespace App\Http\Controllers;
use App\Models\LeaderBoard;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class LeaderBoardController extends Controller
{
    public function show(){
        $leaderBoard=LeaderBoard::join('users','users.id','=','leader_boards.user_id')->limit(10)->orderBy('score','desc')->get();
        // dd($leaderBoard);
        return view('leader-board',compact('leaderBoard'));
    }
    public function update(){
        $score=request('score');
        $recoed=new LeaderBoard();
        $recoed->user_id=Auth::user()->id;
        $recoed->score=$score;
        $recoed->save();

        return response()->json(['success'=>true]);
    }
}
