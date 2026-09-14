const audio = document.getElementById("audio");

const playBtn = document.getElementById("playBtn");
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");

const progressBar = document.getElementById("progressBar");
const volumeBar = document.getElementById("volumeBar");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const songTitle = document.getElementById("songTitle");
const artistName = document.getElementById("artistName");
const albumImage = document.getElementById("albumImage");

const playlistContainer =
    document.getElementById("playlistContainer");

const autoplayBtn =
    document.getElementById("autoplayBtn");


/* =========================
   SONG DATA
========================= */

const songs = [
    {
        title: "Punjabi Vibes",
        artist: "Punjabi Artist",
        audio: "music/song1.mp3",
        image: "images/song1.jpg"
    },

    {
        title: "Jab Se Tum Ko Dekha",
        artist: "Indian Artist",
        audio: "music/song2.mp3",
        image: "images/song2.jpg"
    },

    {
        title: "Zara Zara",
        artist: "Indian Artist",
        audio: "music/song3.mp3",
        image: "images/song3.jpg"
    },

    {
        title: "Khwab Ka Musafir",
        artist: "Indian Artist",
        audio: "music/song4.mp3",
        image: "images/song4.jpg"
    },

    {
        title: "Ishq Jhalak",
        artist: "Indian Artist",
        audio: "music/song5.mp3",
        image: "images/song5.jpg"
    },

    {
        title: "Alone",
        artist: "Indian Artist",
        audio: "music/song6.mp3",
        image: "images/song6.jpg"
    },

    {
        title: "Summer Vibes",
        artist: "Ava Johnson",
        audio: "music/song7.mp3",
        image: "images/song7.jpg"
    },

    {
        title: "Midnight Dreams",
        artist: "Daniel Smith",
        audio: "music/song8.mp3",
        image: "images/song8.jpg"
    },

    {
        title: "Ocean Waves",
        artist: "Luna Ray",
        audio: "music/song9.mp3",
        image: "images/song9.jpg"
    },

    {
        title: "Golden Sky",
        artist: "Alex Morgan",
        audio: "music/song10.mp3",
        image: "images/song10.jpg"
    }

];

let currentSong = 0;

let isPlaying = false;

let autoplay = true;


/* =========================
   LOAD SONG
========================= */

function loadSong(index) {

    const song = songs[index];

    songTitle.textContent = song.title;

    artistName.textContent = song.artist;

    albumImage.src = song.image;

    audio.src = song.audio;

    audio.load();

    updatePlaylist();

}


/* =========================
   PLAY SONG
========================= */

function playSong() {

    audio.play();

    isPlaying = true;

    playBtn.innerHTML =
        '<i class="fa-solid fa-pause"></i>';

}


/* =========================
   PAUSE SONG
========================= */

function pauseSong() {

    audio.pause();

    isPlaying = false;

    playBtn.innerHTML =
        '<i class="fa-solid fa-play"></i>';

}


/* =========================
   PLAY / PAUSE
========================= */

playBtn.addEventListener("click", () => {

    if (isPlaying) {

        pauseSong();

    } else {

        playSong();

    }

});


/* =========================
   NEXT SONG
========================= */

function nextSong() {

    currentSong++;

    if (currentSong >= songs.length) {

        currentSong = 0;

    }

    loadSong(currentSong);

    playSong();

}


nextBtn.addEventListener("click", nextSong);


/* =========================
   PREVIOUS SONG
========================= */

function previousSong() {

    currentSong--;

    if (currentSong < 0) {

        currentSong = songs.length - 1;

    }

    loadSong(currentSong);

    playSong();

}


previousBtn.addEventListener("click", previousSong);


/* =========================
   PROGRESS UPDATE
========================= */

audio.addEventListener("timeupdate", () => {

    if (!audio.duration) return;

    progressBar.max = audio.duration;

    progressBar.value = audio.currentTime;

    currentTime.textContent =
        formatTime(audio.currentTime);

});


/* =========================
   DURATION
========================= */

audio.addEventListener("loadedmetadata", () => {

    duration.textContent =
        formatTime(audio.duration);

    progressBar.max = audio.duration;

});


/* =========================
   PROGRESS CONTROL
========================= */

progressBar.addEventListener("input", () => {

    audio.currentTime = progressBar.value;

});


/* =========================
   VOLUME
========================= */

volumeBar.addEventListener("input", () => {

    audio.volume = volumeBar.value;

});


audio.volume = 0.7;


/* =========================
   FORMAT TIME
========================= */

function formatTime(time) {

    if (isNaN(time)) {
        return "0:00";
    }

    const minutes =
        Math.floor(time / 60);

    const seconds =
        Math.floor(time % 60);

    return `${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;

}


/* =========================
   PLAYLIST
========================= */

function createPlaylist() {

    playlistContainer.innerHTML = "";

    songs.forEach((song, index) => {

        const item =
            document.createElement("div");

        item.classList.add("song-item");

        item.innerHTML = `

            <span class="song-number">
                ${index + 1}
            </span>

            <div class="song-info">

                <h4>${song.title}</h4>

                <p>${song.artist}</p>

            </div>

            <i class="fa-solid fa-play song-icon"></i>

        `;


        item.addEventListener("click", () => {

            currentSong = index;

            loadSong(currentSong);

            playSong();

        });


        playlistContainer.appendChild(item);

    });

}


/* =========================
   UPDATE PLAYLIST
========================= */

function updatePlaylist() {

    const items =
        document.querySelectorAll(".song-item");

    items.forEach((item, index) => {

        item.classList.remove("active");

        if (index === currentSong) {

            item.classList.add("active");

        }

    });

}


/* =========================
   AUTOPLAY
========================= */

autoplayBtn.addEventListener("click", () => {

    autoplay = !autoplay;

    autoplayBtn.classList.toggle(
        "active",
        autoplay
    );

});


audio.addEventListener("ended", () => {

    if (autoplay) {

        nextSong();

    } else {

        pauseSong();

    }

});


/* =========================
   INITIALIZE
========================= */

createPlaylist();

loadSong(currentSong);

autoplayBtn.classList.add("active");