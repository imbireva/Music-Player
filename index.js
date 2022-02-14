'use strict';

const audio = document.querySelector('audio');

const image = document.querySelector('img');

const singer = document.querySelector('.singer-title');
const song = document.querySelector('.song-title');

const progressBar = document.querySelector('.progress-bar');
const progress = document.querySelector('.progress');

const currentTime = document.querySelector('.current-time');
const duration = document.querySelector('.duration');

const playPauseBtn = document.querySelector('.play-pause');
const backward = document.querySelector('.backward');
const forward = document.querySelector('.forward');

const songPaths = ['OneRepublic-CountingStars', 'Passenger-LetHerGo', 'TheWeeknd-BlindingLights'];
const singers = ['One Republic', 'Passenger', 'The Weeknd'];
const songs = ['Counting Stars', 'Let Her Go', 'Blinding Lights'];

let counter = 0;

let isPlay = false;


const init = () => {
    audio.src = `assets/audio/${songPaths[counter]}.mp3`
    image.src = `assets/img/${counter}.jpg`;
    singer.innerHTML = singers[counter];
    song.innerHTML = songs[counter];
};

init();


const playMusic = () => {
    audio.play();
    isPlay = true;
    playPauseBtn.classList.add('pause');
};

const pauseMusic = () => {
    audio.pause();
    isPlay = false;
    playPauseBtn.classList.remove('pause');
};


playPauseBtn.addEventListener('click', () => {
    if (isPlay === false) {
        playMusic();    
    }
    else {
        pauseMusic();        
    }
});


const playNext = () => {
    counter = counter + 1;
    if (counter > (songPaths.length - 1)) {
        counter = 0;
    }
    init();
    playMusic();
};

const playPrev = () => {
    counter = counter - 1;
    if (counter < 0) {
        counter = songPaths.length - 1;
    }
    init();
    playMusic();
};

forward.addEventListener('click', playNext);
backward.addEventListener('click', playPrev);

audio.addEventListener('ended', playNext); // autoplay


audio.addEventListener('loadeddata', () => {
    const min = Math.floor(audio.duration / 60);
    const sec = Math.floor(audio.duration % 60);

    const secWithZero = `0${sec}`.slice(-2);

    duration.innerHTML = `${min}:${secWithZero}`;
 });

audio.addEventListener('timeupdate', () => {
    const min = Math.floor(audio.currentTime / 60); 
    const sec = Math.floor(audio.currentTime % 60);

    const secWithZero = `0${sec}`.slice(-2);

    currentTime.innerHTML = `${min}:${secWithZero}`;

    const percent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${percent}%`;
});

progressBar.addEventListener('click', (event) => {
    const width = progressBar.clientWidth;
    const click = event.offsetX;
    const duration = audio.duration;
    audio.currentTime = (click / width) * duration;
}); 
