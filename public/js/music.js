// public/js/music.js
const MUSIC_KEY = "valentine_music_on";
let audio;

function getAudio() {
  if (!audio) {
    audio = new Audio("public/audio/music.mp3");
    audio.loop = true;
    audio.volume = 0.7;
  }
  return audio;
}

// If user already started music earlier in this session, resume on each page
(function resumeIfNeeded() {
  if (sessionStorage.getItem(MUSIC_KEY) === "true") {
    getAudio()
      .play()
      .catch(() => {});
  }
})();

// Call this on the first user interaction (Enter click)
window.startValentineMusic = function startValentineMusic() {
  sessionStorage.setItem(MUSIC_KEY, "true");
  return getAudio().play();
};

