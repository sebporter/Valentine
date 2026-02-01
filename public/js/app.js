// public/js/app.js

const eyebrow = document.getElementById("eyebrow");
const title = document.getElementById("title");
const message = document.getElementById("message");

const photoWrap = document.getElementById("photoWrap");
const photo = document.getElementById("photo");

const primaryBtn = document.getElementById("primaryBtn");
const secondaryBtn = document.getElementById("secondaryBtn");

const music = document.getElementById("bgMusic");

let musicStarted = false;

// 0 = landing, 1..8 = photo frames, 9 = final question (ends here)
const frames = [
  {
    eyebrow: "For Jasmine",
    title: "Dear Jasmine,",
    message: "I know we’re not in the same place right now.",
    image: null,
    primaryText: "Enter",
    mode: "enter",
  },
  {
    eyebrow: "Brisbane ↔ Dubai",
    title: "Okay, listen…",
    message: "Brisbane to Dubai.\nDifferent skies.\nSame us.",
    image: "sebjas1.jpg",
    primaryText: "Keep going",
    mode: "next",
  },
  {
    eyebrow: "Still counts",
    title: "Just so we’re clear:",
    message:
      "Valentine’s Day still counts,\neven when we’re on opposite sides of the world.",
    image: "sebjas2.jpg",
    primaryText: "Keep going",
    mode: "next",
  },
  {
    eyebrow: "The small things",
    title: "I still think about…",
    message:
      "The small things.\nYour laugh.\nThe way you make ordinary days lighter.",
    image: "sebjas3.jpg",
    primaryText: "Keep going",
    mode: "next",
  },
  {
    eyebrow: "Closer than it looks",
    title: "Even with distance…",
    message: "You still feel close in all the ways that matter.",
    image: "sebjas4.jpg",
    primaryText: "Keep going",
    mode: "next",
  },
  {
    eyebrow: "Chosen",
    title: "No big speech.",
    message:
      "This isn’t about one dinner or one night.\nIt’s about choosing you,\nfrom Dubai to Brisbane.",
    image: "sebjas5.jpg",
    primaryText: "Keep going",
    mode: "next",
  },
  {
    eyebrow: "If I could",
    title: "If teleporting existed…",
    message: "I’d be in Brisbane.\nRight now.\nNo hesitation.",
    image: "sebjas6.jpg",
    primaryText: "Keep going",
    mode: "next",
  },
  {
    eyebrow: "Until then",
    title: "So this is me,",
    message: "Making the distance feel smaller,\none click at a time.",
    image: "sebjas7.jpg",
    primaryText: "Keep going",
    mode: "next",
  },
  {
    eyebrow: "One last thing",
    title: "Proof, really…",
    message: "We’re worth the wait.\nAlways.",
    image: "sebjas8.jpg",
    primaryText: "Keep going",
    mode: "next",
  },
  {
    eyebrow: "Final question",
    title: "So…",
    message: "Will you be my Valentine?",
    image: null,
    primaryText: "Yes",
    mode: "question",
  },
];

let step = 0;

function setMultiline(el, text) {
  el.innerHTML = "";
  String(text)
    .split("\n")
    .forEach((line, i, arr) => {
      el.appendChild(document.createTextNode(line));
      if (i < arr.length - 1) el.appendChild(document.createElement("br"));
    });
}

function render() {
  const f = frames[step];

  eyebrow.textContent = f.eyebrow;
  title.textContent = f.title;
  setMultiline(message, f.message);

  if (f.image) {
    photoWrap.classList.add("show");
    photo.src = `public/images/${f.image}`;
    photo.alt = `Seb & Jasmine ${f.image}`;
  } else {
    photoWrap.classList.remove("show");
    photo.src = "";
    photo.alt = "";
  }

  if (f.mode === "question") {
    primaryBtn.textContent = "Yes";
    secondaryBtn.style.display = "inline-flex";
    secondaryBtn.textContent = "No";
    secondaryBtn.style.transform = ""; // reset dodging position
    primaryBtn.disabled = false;
  } else {
    primaryBtn.textContent = f.primaryText;
    secondaryBtn.style.display = "none";
    primaryBtn.disabled = false;
  }
}

async function startMusicOnce() {
  if (musicStarted) return;
  musicStarted = true;
  try {
    music.volume = 0.7;
    await music.play();
  } catch (e) {
    musicStarted = false;
  }
}

primaryBtn.addEventListener("click", async () => {
  const f = frames[step];

  if (f.mode === "enter") {
    await startMusicOnce();
    step = 1;
    render();
    return;
  }

  if (f.mode === "next") {
    step = Math.min(step + 1, frames.length - 1);
    render();
    return;
  }

  if (f.mode === "question") {
    // End here (as requested). No more screens.
    // Optionally lock in the Yes button so it feels final.
    primaryBtn.textContent = "❤️";
    primaryBtn.disabled = true;
    secondaryBtn.style.display = "none";
  }
});

function dodgeNo() {
  const dx = Math.random() * 260 - 130;
  const dy = Math.random() * 180 - 90;
  secondaryBtn.style.transform = `translate(${dx}px, ${dy}px)`;
}

secondaryBtn.addEventListener("pointerenter", dodgeNo);
secondaryBtn.addEventListener("pointerdown", dodgeNo);

render();

