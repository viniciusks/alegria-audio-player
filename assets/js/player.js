import audios from "./data.js";
import { path, secondsToMinutes } from "./utils.js";
import elements from "./playerElements.js";

export default {
  audioData: audios,
  currentAudio: {},
  currentPlaying: 0,
  isPlaying: false,
  start() {
    elements.getElements.call(this);
    this.update();
  },
  play() {
    this.isPlaying = true;
    this.audio.play();
    this.playPause.innerText = "pause";
  },
  pause() {
    this.isPlaying = false;
    this.audio.pause();
    this.playPause.innerText = "play_arrow";
  },
  togglePlayPause() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  },
  toggleMute() {
    this.audio.muted = !this.audio.muted;
    this.mute.innerText = this.audio.muted ? "volume_mute" : "volume_up";
  },
  next() {
    this.currentPlaying++;
    if (this.currentPlaying == this.audioData.length) this.restart();
    this.update();
    this.play();
  },
  manualNext() {
    this.pause();
    this.currentPlaying++;
    if (this.currentPlaying == this.audioData.length) this.restart();
    this.update();
    this.play();
  },
  manualPrevious() {
    this.pause();
    if (this.currentPlaying == 0) {
      this.currentPlaying = this.audioData.length - 1;
    } else {
      this.currentPlaying--;
    }
    this.update();
    this.play();
  },
  setVolume(value) {
    this.audio.volume = value / 100;
  },
  setSeek(value) {
    this.audio.currentTime = value;
  },
  timeUpdate() {
    this.currentDuration.innerText = secondsToMinutes(this.audio.currentTime);
    this.seekbar.value = this.audio.currentTime;
  },
  update() {
    this.currentAudio = this.audioData[this.currentPlaying];
    this.cover.style.background = `url('${path(
      this.currentAudio.cover
    )}') no-repeat center center / cover`;
    this.title.innerHTML = this.currentAudio.title;
    this.artist.innerHTML = this.currentAudio.artist;
    elements.createAudioElement.call(this, this.currentAudio.file);
    this.audio.onloadeddata = () => {
      elements.actions.call(this);
    };
  },
  restart() {
    this.currentPlaying = 0;
    this.update();
  },
  getAlbums(url) {
    fetch(`${url}/albums`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((object) => {
        console.log(object.data);
        let albumsList = document.querySelector("#albums");
        let albums = object.data;

        albums.map((album) => {
          console.log(album.name);
          let li = document.createElement("li");
          let h6 = document.createElement("h6");
          let btn = document.createElement("button");
          btn.classList.add("btn");
          btn.classList.add("btn-footer");

          h6.innerHTML = String(album.name);
          btn.innerHTML = "Tocar";

          li.append(h6);
          li.append(btn);
          albumsList.append(li);
        });
      });
  },
};
