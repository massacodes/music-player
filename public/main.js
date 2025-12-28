const musicContainer = document.getElementById("music-card");
const playBtn = document.getElementById("play-btn");
const previousBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const audio = document.getElementById("audio");
const progressBar = document.getElementById("progress-bar");
const progressContainer = document.getElementById("progress-container");
const Title = document.getElementById("song-title");
const cover = document.getElementById("song-cover");
const Artist = document.getElementById("Artist");
const pauseIcon = document.getElementById("pause-icon");
const playIcon = document.getElementById("play-icon");
const currentTimeLabel = document.getElementById("current-time");
const durationLabel = document.getElementById("song-duration");
const volumeSlider = document.getElementById("volume-slider");

const songs = ["gettin-my-mom-on", "what-do-they-know", "winter-remix"];
const Artists = ["Jack Stauber", "Mindless Self Indulgence", "Vivaldi"];
const covers = [
  "url(../src/assets/HiLo-cover.jpg)",
  "url(../src/assets/Mindless-Self-Indulgence.jpg)",
  "url(../src/assets/violin.jpg)",
];
const duration = audio.duration;
let isPlaying = false;
let songIndex = 1;
let artistIndex = songIndex;

// connect volume slider to audio volume
volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

// Initially load song info
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  Title.innerText = song;
  Artist.innerText = Artists[artistIndex];
  audio.src = `../src/assets/music/${song}.mp3`;
  cover.style.backgroundImage = covers[songIndex];
}

audio.addEventListener("loadedmetadata", () => {
  function formatDuration(duration) {
    // Calculate minutes and seconds
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);

    // Pad single-digit minutes and seconds with a leading zero
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    // Return the formatted string
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  durationLabel.innerHTML = formatDuration(audio.duration);
});

function playSong() {
  playIcon.classList.add("hidden");
  pauseIcon.classList.remove("hidden");
  isPlaying = true;
  audio.play();
}

function pauseSong() {
  playIcon.classList.remove("hidden");
  pauseIcon.classList.add("hidden");
  isPlaying = false;
  audio.pause();
}

function prevSong() {
  songIndex--;
  artistIndex--;

  if (artistIndex < 0) {
    artistIndex = Artists.length - 1;
  }

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

function nextSong() {
  songIndex++;
  artistIndex++;

  if (artistIndex > Artists.length - 1) {
    artistIndex = 0;
  }

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// update progress bar & time

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progressBar.style.width = `${progressPercent}%`;

  const minutes = Math.floor(audio.currentTime / 60);
  const seconds = Math.floor(audio.currentTime % 60);

  // Pad single-digit minutes and seconds with a leading zero
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  currentTimeLabel.innerHTML = `${formattedMinutes}:${formattedSeconds}`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// song play/pause events

playBtn.addEventListener("click", () => {
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// change song events

previousBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", setProgress);
audio.addEventListener("ended", nextSong);
