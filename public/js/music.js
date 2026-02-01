// public/js/music.js
const MUSIC_KEY = "valentine_music_on";
const MUSIC_TIME_KEY = "valentine_music_time";
const MUSIC_STARTED_THIS_PAGE = "valentine_music_started_this_page";

let audio;

function getAudio() {
  if (!audio) {
    audio = new Audio("public/audio/music.mp3");
    audio.loop = true;
    audio.volume = 0.7;

    // Persist playback position occasionally
    audio.addEventListener("timeupdate", () => {
      // write at most ~1/sec-ish without timers
      if (!audio.paused && audio.currentTime) {
        sessionStorage.setItem(MUSIC_TIME_KEY, String(audio.currentTime));
      }
    });

    // Save position if user navigates away / reloads
    window.addEventListener("beforeunload", () => {
      try {
        sessionStorage.setItem(MUSIC_TIME_KEY, String(audio.currentTime || 0));
      } catch (_) {}
    });
  }
  return audio;
}

function restoreTimeIfPossible(a) {
  const t = Number(sessionStorage.getItem(MUSIC_TIME_KEY));
  if (Number.isFinite(t) && t > 0) {
    // If file is shorter or not ready yet, setting currentTime might throw; ignore safely.
    try {
      a.currentTime = t;
    } catch (_) {}
  }
}

async function playIfNeeded() {
  const a = getAudio();

  // If already playing, do nothing
  if (!a.paused && !a.ended) return;

  restoreTimeIfPossible(a);

  try {
    await a.play();
  } catch (_) {
    // Autoplay blocked or other error; ignore silently.
  }
}

// Resume on page load ONLY if music was previously started
(function resumeIfNeeded() {
  if (sessionStorage.getItem(MUSIC_KEY) === "true") {
    // Prevent multiple resume attempts on the same page
    if (sessionStorage.getItem(MUSIC_STARTED_THIS_PAGE) === "true") return;
    sessionStorage.setItem(MUSIC_STARTED_THIS_PAGE, "true");
    playIfNeeded();
  }
})();

// Start music on first user interaction (your Enter click)
window.startValentineMusic = async function startValentineMusic() {
  sessionStorage.setItem(MUSIC_KEY, "true");

  // Prevent repeated "start" calls on the same page from restarting
  if (sessionStorage.getItem(MUSIC_STARTED_THIS_PAGE) !== "true") {
    sessionStorage.setItem(MUSIC_STARTED_THIS_PAGE, "true");
  }

  await playIfNeeded();
};
