class DrumKit {
  constructor() {
    this.playBtn = document.querySelector(".play");
    this.pads = document.querySelectorAll(".pad");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.index = 0;
    this.bpm = 150;
  }
  ActivePad() {
    this.classList.toggle("active");
  }

  Repeat() {
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    this.index++;
  }
  Start() {
    const interval = (60 / this.bpm) * 1000;
    setInterval(() => {
      this.Repeat();
    }, interval);
  }
}

const drumKit = new DrumKit();

drumKit.pads.forEach((pad) => {
  pad.addEventListener("click", drumKit.ActivePad);
});

drumKit.playBtn.addEventListener("click", function () {
  drumKit.Start();
});
