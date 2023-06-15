import { secondsToMinutes } from "./utils.js";

const url = "https://us-central1-alegriatech-2bf22.cloudfunctions.net";

export default {
  getElements() {
    this.cover = document.querySelector(".card-image");
    this.title = document.querySelector(".card-content h5");
    this.artist = document.querySelector(".card-content .artist");
    this.playPause = document.querySelector("#play-pause");
    this.mute = document.querySelector("#mute");
    this.volControl = document.querySelector("#vol-control");
    this.seekbar = document.querySelector("#seekbar");
    this.currentDuration = document.querySelector("#current-duration");
    this.totalDuration = document.querySelector("#total-duration");
    this.skipPrevious = document.querySelector("#skipPrevious");
    this.skipNext = document.querySelector("#skipNext");
    this.buttonAlbums = document.querySelector("#listAlbums");
  },
  createAudioElement(audio) {
    this.audio = new Audio(audio);
  },
  actions() {
    this.audio.onended = () => this.next();
    this.audio.ontimeupdate = () => this.timeUpdate();
    this.playPause.onclick = () => this.togglePlayPause();
    this.mute.onclick = () => this.toggleMute();
    this.volControl.oninput = () => this.setVolume(this.volControl.value);
    this.volControl.onchange = () => this.setVolume(this.volControl.value);
    this.seekbar.oninput = () => this.setSeek(this.seekbar.value);
    this.seekbar.onchange = () => this.setSeek(this.seekbar.value);
    this.seekbar.max = this.audio.duration;
    this.totalDuration.innerText = secondsToMinutes(this.audio.duration);
    this.skipPrevious.onclick = () => this.manualPrevious();
    this.skipNext.onclick = () => this.manualNext();
    this.buttonAlbums.onclick = () => this.getAlbums(url);
  },
};
