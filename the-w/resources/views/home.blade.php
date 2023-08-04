@extends('layouts.app')

<style>
    .game-background {
        /* margin-top: 0px; */
        /* height: 100%; */
        background-image: url('{{ asset('images/background-3.jpg') }}');
        overflow-x: hidden;
        overflow-y: hidden;
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
        top: 450px;
        left: 500px;
        position: absolute;
        /* animation: jump 1s; */
    }

    /* .dagger {
        height: 15px;
        transform: scaleX(-1);
        top: 450px;
        left: 1500px;
         position: absolute;
    } */

    @keyframes jump {
        0% {
            top: 450px
        }

        30% {
            top: 350px
        }

        70% {
            top: 350px
        }

        100% {
            top: 450px;
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

    .dagger-x-animate {
        animation: daggerX 5s;
    }

    .dagger-y-animate {
        animation: daggerY 3s;
    }

    @keyframes daggerX {
        0% {
            left: 1450px;
            /* opacity: 100%; */
        }

        100% {
            left: -1200px;
            /* opacity: 0%; */
        }
    }

    @keyframes daggerY {
        0% {
            top: 130px;
            /* opacity: 100%; */
        }

        100% {
            top: 650px;
            /* opacity: 0%; */
        }
    }

    .score {
        color: white;
        background-color: black;
        margin: auto;
        position: relative;
    }

    /* .test {
        width: 10px;
        height: 10px;
        background-color: red;
        position: relative;
        top: 330px;
        left: 570px;
    } */
    .game-start-text {
        /* position: absolute; */
        text-align: center;
        /* display: flex; */
        /* align-items: center; */
        /* vertical-align: middle; */
        /* margin-top: 250px; */
        /* display: grid; */
        /* place-items: center; */
        margin-top: 250px;
        color: darkorange;
        font-weight: inherit;
        /* left: 50%; */
    }
</style>

@section('content')
    <div class="game-background" id="game-background">
        <div id="score" class="score">
            <h5 id="score-board"></h5>
        </div>
        {{-- <div class="test">

        </div> --}}
        <div id="game-start-text" class="game-start-text">
            <h1>Press Enter To Start</h1>
            <b style="color: red;">Press "J" to Attack</b>
        </div>
        {{-- <img src="{{ asset('images/Player/Idle__000.png') }}" alt="Player" class="player" id="player"> --}}
        <img src="{{ asset('images/Player/Idle__000.png') }}" alt="Player" class="player" id="player">
        {{-- <img src="{{ asset('images/Player/Kunai.png') }}" alt="dagger" class="dagger" id="dagger"> --}}
    </div>
@endsection
{{-- <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script> --}}
<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.0.18/dist/sweetalert2.all.min.js"></script>
<script src="{{ asset('js/game/game.js') }}"></script>
