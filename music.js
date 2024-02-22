const audio = document.getElementById('audio');
const prevBtn = document.getElementById("prevBtn");
const playPauseBtn = document.getElementById('playPauseBtn');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');
const songTitle = document.getElementById('songTitle');
const albumArtwork = document.getElementById('albumArtwork');
const artist = document.getElementById('artist');
const progress = document.getElementById('progress');
const playTime = document.getElementById('playTime');
const restartCurrentSongBtn = document.getElementById('restartCurrentSongBtn');
const restartPlaylistBtn = document.getElementById('restartPlaylistBtn');
const love = document.querySelector('#love');


const playlist = [
  {
    title: 'Song 1',
    artist: 'Artist 1',
    thumbnail: 'music-logo2.jpg',
    file: 'song.mp3',
  },
  {
    title: 'The_Search',
    artist: 'NF',
    thumbnail: 'music-logo2.jpg',
    file: 'NF_-_The_Search_Gospelpaper.com.ng.mp3',
  },
  {
    title: 'Sunroof',
    artist: 'Nicky_Youre-Dazy',
    thumbnail: 'music-logo2.jpg',
    file: 'Nicky_Youre_dazy_-_Sunroof_Soloplay.ng.mp3',
  },
  {
    title: 'Si-No-Estas',
    artist: 'inigo-quintero',
    thumbnail: 'music-logo2.jpg',
    file: 'inigo-quintero-Si-No-Estas-Letra-Oficial.mp3',
  },
  {
    title: 'Dandelions',
    artist: 'Ruth_B',
    thumbnail: 'music-logo2.jpg',
    file: 'Ruth-B-Dandelions.mp3',
  },
  {
    title: 'Hope',
    artist: 'XXXTENTACION',
    thumbnail: 'music-logo2.jpg',
    file: 'XXXTENTACION_Hope_(thinkNews.com.ng).mp3',
  } 
];


let currentSongIndex = 0;
let isPlaying = false; 
let currentPlaybackTime = 0;

function playSong(index) {
  if (index >= 0 && index < playlist.length) {
    const song = playlist[index];
    audio.src = song.file;
    audio.currentTime = 0;
    if (isPlaying) {
      audio.play();
      playPauseBtn.querySelector("i.fa").classList.add("fa-pause");
      playPauseBtn.querySelector("i.fa").classList.remove("fa-play");
    } else {
      playPauseBtn.querySelector("i.fa").classList.add("fa-play");
      playPauseBtn.querySelector("i.fa").classList.remove("fa-pause");
    }
    currentSongIndex = index;
    updateSongInfo(song);
  }
}

function pauseSong() {
  audio.pause();
  playPauseBtn.querySelector("i.fa").classList.add("fa-play");
  playPauseBtn.querySelector("i.fa").classList.remove("fa-pause");
  isPlaying = false;
  currentPlaybackTime = audio.currentTime;
}

function restartPlaylist() {
  currentSongIndex = 0;
  playSong(currentSongIndex);
}

function updateSongInfo(song) {
  songTitle.textContent = ` ${song.title}`;
  artist.textContent = `${song.artist}`;
  albumArtwork.src = song.thumbnail;
  albumArtwork.alt = `Album Artwork for ${song.album}`;
}

playPauseBtn.addEventListener('click', () => {
  if (isPlaying) {
    pauseSong();
  } else {
    audio.play();
    playPauseBtn.querySelector("i.fa").classList.remove("fa-play");
    playPauseBtn.querySelector("i.fa").classList.add("fa-pause"); 
    isPlaying = true; // Set the playback state to playing
  }
});

nextBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  playSong(currentSongIndex);
});

prevBtn.addEventListener('click', () => {
  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
  playSong(currentSongIndex);
});

restartBtn.addEventListener('click', () => {
  restartPlaylist();
});

audio.addEventListener('ended', () => {
  currentSongIndex = (currentSongIndex + 1) % playlist.length;
  playSong(currentSongIndex);
});

audio.autoplay = false;
playSong(currentSongIndex);

function updateProgressBar() {
  const currentTime = audio.currentTime;
  const duration = audio.duration;
  progress.value = currentTime;
  progress.max = duration;
  playTime.textContent = formatTime(currentTime) + ' / ' + formatTime(duration);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

audio.addEventListener('timeupdate', updateProgressBar);

progress.addEventListener('input', () => {
    audio.currentTime = progress.value;
    updateProgressBar();
});

  progress.addEventListener('input', () => {
    audio.currentTime = progress.value;
    updateProgressBar();
  });
  const volumeEl = document.querySelector("#volume-slider");
  volumeEl.addEventListener("input", () => {
    // const audio = new Audio(url);
    audio.volume = volumeEl.value;
  });