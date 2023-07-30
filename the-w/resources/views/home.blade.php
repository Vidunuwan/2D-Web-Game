@extends('layouts.app')

<style>
    .game-background {
        background-image: url('{{ asset('images/background-3.jpg') }}');
        overflow-x: hidden;
        /* position: absolute; */
        background-repeat: no-repeat;
        background-size: cover;
        height: 85vh;
        /* width: 100%; */
        /* background-attachment: fixed; */
        background-position: center;

    }

    .player {
        height: 130px;
        top: 53vh;
        left: 80vh;
        position: relative;
        /* animation: jump 1s; */
    }

    @keyframes jump {
        0% {
            top: 53vh
        }

        30% {
            top: 38vh
        }

        70% {
            top: 38vh
        }

        100% {
            top: 53vh;
        }
    }

    .jump-animation {
        animation: jump 1s;
    }

    .flipped-right {
        transform: scaleX(1);
    }

    .flipped-left {
        transform: scaleX(-1);
    }

    .dagger {
        width: 100px;
        transform: scaleX(-1);
        top: 50vh;
        left: 1500px;
        position: relative;
    }

    .dagger-animate {
        animation: dagger 3s;
    }

    @keyframes dagger {
        0% {
            left: 1500px;
            /* opacity: 100%; */
        }

        100% {
            left: -1200px;
            /* opacity: 0%; */
        }
    }
</style>

@section('content')
    <div class="game-background" id="game-background">
        {{-- <img src="{{ asset('images/Player/Idle__000.png') }}" alt="Player" class="player" id="player"> --}}
        <img src="{{ asset('images/Player/Idle__000.png') }}" alt="Player" class="player" id="player">
        {{-- <img src="{{ asset('images/Player/Kunai.png') }}" alt="dagger" class="dagger d-none" id="dagger"> --}}
    </div>
@endsection
{{-- <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script> --}}
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="{{ asset('js/game/game.js') }}"></script>
