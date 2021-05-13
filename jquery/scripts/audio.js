let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".tr-art");
let track_name = document.querySelector(".tr-name");
let track_artist = document.querySelector(".tr-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_sli");
let volume_slider = document.querySelector(".vol_sli");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let t_index = 0;
let isPlaying = false;
let updateTimer;
let curr_track = document.createElement('audio');

let t_list;

$.getJSON(" http://localhost:3000/songs",function(data){
  t_list=data;
t_list=JSON.parse(sessionStorage.getItem("playlist"));
  loadTrack(t_index,t_list);
});



function random_bg_color() {
let bgColor = "white";
  document.body.style.background = bgColor;
}

function loadTrack(t_index,list) {
 
  clearInterval(updateTimer);
  //resetValues();

  console.log(list);
  curr_track.src = list[t_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + list[t_index].image + ")";
  track_name.textContent = list[t_index].name;
  track_artist.textContent = list[t_index].artist;
  t_list=list;

  curr_track.addEventListener("ended", nextTrack);

  sessionStorage.setItem("recentsong",JSON.stringify(t_list[t_index]));
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}




function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (t_index < t_list.length - 1)
    t_index += 1;
  else t_index = 0;
  loadTrack(t_index,t_list);
  playTrack();
}

function prevTrack() {
  if (t_index > 0)
    t_index -= 1;
  else t_index = t_list.length-1;
  loadTrack(t_index,t_list);
  playTrack();
}

function seek() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVol() {
  curr_track.volume = volume_slider.value / 100;
}

