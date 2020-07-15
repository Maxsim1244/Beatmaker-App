class DrumKit {
  constructor() {
    this.playBtn = document.querySelector(".play");
    this.pads = document.querySelectorAll(".pad");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
    this.currentKick = "./sounds/kick-classic.wav";
    this.currentHihat = "./sounds/hihat-acoustic01.wav";
    this.currentSnare = "./sounds/snare-acoustiv01.wav";
    this.selects = document.querySelectorAll("select");
    this.muteBtns = document.querySelectorAll(".mute");
    this.tempSlider = document.querySelector(".temp-slider");
  }
  ActivePad() {
    this.classList.toggle("active");
  }

  Repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    activeBars.forEach((bar) => {
      bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      if (bar.classList.contains("active")) {
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
    this.index++;
  }
  Start() {
    const interval = (60 / this.bpm) * 1000;
    if (!this.isPlaying) {
      this.playBtn.innerText = "Stop";
      this.isPlaying = setInterval(() => {
        this.Repeat();
      }, interval);
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
      this.playBtn.innerText = "Play";
    }
  }
  ChamgeSound(e) {
    const selectName = e.target.name;
    console.log(selectName);
    const selectValue = e.target.value;
    switch (selectName) {
      case "kick-select":
        this.kickAudio.src = selectValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectValue;
      case "hihat-select":
        this.hihatAudio.src = selectValue;
        break;
    }
  }
  Mute(e) {
    const muteIndex = e.target.getAttribute("data-track");
    e.target.classList.toggle("active");
    if (e.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareAudio.volume = 0;
          break;
        case "2":
          this.hihatAudio.volume = 0;
          break;
      }
    } else {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 1;
          break;
        case "1":
          this.snareAudio.volume = 1;
          break;
        case "2":
          this.hihatAudio.volume = 1;
          break;
      }
    }
  }
  ChangeTemp(e) {
    const tempText = document.querySelector(".temp-nr");
    this.bpm = e.target.value;
    tempText.innerHTML = e.target.value;
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playBtn = document.querySelector(".play");
    if (playBtn.innerText === "Stop") {
      this.Start();
    }
  }
}

const drumKit = new DrumKit();

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.ActivePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drumKit.playBtn.addEventListener("click", function () {
  drumKit.Start();
});

drumKit.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    drumKit.ChamgeSound(e);
  });
});
drumKit.muteBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    drumKit.Mute(e);
  });
});
drumKit.tempSlider.addEventListener("input", function (e) {
  drumKit.ChangeTemp(e);
});
