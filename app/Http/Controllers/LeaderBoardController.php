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
        $leaderBoard=LeaderBoard::all();
        $score=request('score');
        if($leaderBoard->count()<10){
            $recoed=new LeaderBoard();
            $recoed->user_id=Auth::user()->id;
            $recoed->score=$score;
            $recoed->save();
        }else{
            $topScore=LeaderBoard::select('id','score')->orderBy('score')->orderBy('created_at')->first();
            if($score>$topScore->score){
                $newScore=LeaderBoard::findOrFail($topScore->id);
                $newScore->score=$score;
                $newScore->created_at=now();
                $newScore->save();
            }

        }


        return response()->json(['success'=>true]);
    }
}
