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
</style>

@section('content')
    <div class="game-background">
        ss
    </div>
@endsection
