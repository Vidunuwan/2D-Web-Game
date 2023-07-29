@extends('layouts.app')

<style>
    .game-background {
        background-image: url('{{ asset('images/background-3.jpg') }}');
        background-repeat: no-repeat;
        background-size: cover;
        height: 85vh;
        /* width: 100%; */
        /* background-attachment: fixed; */
        background-position: center;

    }

    .player {
        height: 130px;
        margin-top: 53vh
    }
</style>

@section('content')
    <div class="game-background">
        <img src="{{ asset('images/Player/Idle__000.png') }}" alt="Player" class="player" id="player">
    </div>
@endsection
{{-- <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script> --}}
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="{{ asset('js/game/game.js') }}"></script>
