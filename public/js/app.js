// public/js/app.js

const eyebrow = document.getElementById("eyebrow");
const title = document.getElementById("title");
const message = document.getElementById("message");

const photoWrap = document.getElementById("photoWrap");
const photo = document.getElementById("photo");

const primaryBtn = document.getElementById("primaryBtn");
const secondaryBtn = document.getElementById("secondaryBtn");

const music = document.getElementById("bgMusic");

// Change this any time you replace images but keep the same filenames
const ASSET_VERSION = "20260201-2";

let musicStarted = false;
let step = 0;

function setMultiline(el, text) {
  el.innerHTML = "";
  String(text).split("\n").forEach((line, i, arr) => {
    el.appendChild(document.createTextNode(line));
    if (i < arr.length - 1) el.appendChild(document.createElement("br"));
  });
}

/*
  step 0  = landing (no image)
  step 1–8 = sebjas1.jpg → sebjas8.jpg
  step 9  = final question (no image) — should show "Yes" + "No"
*/
const frames = [
  {
    eyebrow: "For Jasmine",
    title: "Dear Jasmine,",
    message: 'People say, “If he wanted to, he would.”\n\nSo I built you a website.',
    image: null,
    mode: "enter",
  },

  {
    eyebrow: "Brisbane ↔ Dubai",
    title: "Here’s the situation.",
    message:
      "I’m sorry I won’t be with you on Valentine’s Day.\n\nBrisbane to Dubai.\nDifferent time zones.\nStill us.",
    image: "sebjas1.jpg",
    mode: "next",
  },
  {
    eyebrow: "February 14",
    title: "About Valentine’s Day:",
    message: "It doesn’t stop counting\njust because we’re far apart.",
    image: "sebjas2.jpg",
    mode: "next",
  },
  {
    eyebrow: "Little things",
    title: "What sticks with me:",
    message: "The small stuff.\nYour laugh.\nHow you make normal days better.",
    image: "sebjas3.jpg",
    mode: "next",
  },
  {
    eyebrow: "Distance check",
    title: "Honestly,",
    message: "Even with the distance,\nyou don’t feel far to me.",
    image: "sebjas4.jpg",
    mode: "next",
  },
  {
    eyebrow: "This part matters",
    title: "Just to be clear:",
    message:
      "This isn’t about one dinner\nor one night.\nIt’s about choosing you,\nDubai to Brisbane included.",
    image: "sebjas5.jpg",
    mode: "next",
  },
  {
    eyebrow: "If I’m being honest",
    title: "Right now,",
    message: "I wish I could cook you dinner\non Valentine’s Day.",
    image: "sebjas6.jpg",
    mode: "next",
  },
  {
    eyebrow: "Until then",
    title: "So this is me,",
    message: "Doing what I can\nto make the distance feel smaller.",
    image: "sebjas7.jpg",
    mode: "next",
  },
  {
    eyebrow: "Before I ask",
    title: "One thing I know:",
    message: "We’re worth the wait.",
    image: "sebjas8.jpg",
    mode: "next",
  },

  {
    eyebrow: "Final question",
    title: "So",
    message: "Will you be my Valentine?",
    image: null,
    mode: "question",
  },
];

function render() {
  const f = frames[step];

  eyebrow.textContent = f.eyebrow;
  title.textContent = f.title;
  setMultiline(message, f.message);

  if (f.image) {
    photoWrap.classList.add("show");

    const src = `public/images/${f.image}?v=${ASSET_VERSION}&step=${step}`;

    photo.onerror = () => {
      photoWrap.classList.remove("show");
      message.textContent = `Could not load image: ${f.image}`;
    };

    photo.src = "";
    photo.src = src;
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
    secondaryBtn.style.transform = "";
    primaryBtn.disabled = false;
  } else if (f.mode === "enter") {
    primaryBtn.textContent = "Enter";
    secondaryBtn.style.display = "none";
    primaryBtn.disabled = false;
  } else {
    primaryBtn.textContent = "Keep going";
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
    // End the journey here
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
