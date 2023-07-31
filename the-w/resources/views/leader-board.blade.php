@extends('layouts.app')

@section('content')
    <div class="ms-3">
        <a class="btn btn-primary" href="/home" role="button">Play the Game</a>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Score</th>
                    <th scope="col">Player Name</th>
                    {{-- <th scope="col">Played Time</th> --}}
                </tr>
            </thead>
            <tbody>
                @php
                    $i = 0;
                @endphp
                @foreach ($leaderBoard as $score)
                    @php
                        $i++;
                        // $date = Carbon\Carbon::parse($score->created_at);
                        // $date->setTimezone('Asia/Kolkata');
                        // $date = $date->format('Y-m-d');
                    @endphp
                    <tr>
                        <th scope="row">{{ $i }}</th>
                        <td>{{ $score->score }}</td>
                        <td>{{ $score->name }}</td>
                        {{-- <td>{{ $date }}</td> --}}
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
@endsection
