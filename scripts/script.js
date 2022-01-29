let nav = document.querySelector("nav");
let val;
window.onscroll = function() {
  if(document.documentElement.scrollTop > 10){
    nav.classList.add("sticky");
  }else{
    nav.classList.remove("sticky");
  }

}

let body = document.querySelector("body");
let header = document.querySelector(".header");
let menuBtn = document.querySelector(".menu-btn");
let cancelBtn = document.querySelector(".cancel-btn");
menuBtn.onclick = function(){
  header.classList.add("active");
  menuBtn.style.opacity = "0";
  menuBtn.style.pointerEvents = "none";
  body.style.overflow = "hidden";
}
cancelBtn.onclick = function(){
  header.classList.remove("active");
  menuBtn.style.opacity = "1";
  menuBtn.style.pointerEvents = "auto";
  body.style.overflow = "auto";
}

let navLinks = document.querySelectorAll(".menu li a");
for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click" , function() {
    header.classList.remove("active");
    menuBtn.style.opacity = "1";
    menuBtn.style.pointerEvents = "auto";
  });
}


//Fetch Live Subscribers Count

let apiKey = config.ytda;
const channelID = config.ytid;
const plistID = config.ytps;
const subCount = document.querySelector('.subCount');
var vidTitle = document.getElementsByClassName('vidTitle');
var thumb = document.getElementsByClassName('vids');

let getSubscribers = () => {
    fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelID}&key=${apiKey}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            subCount.innerHTML =  data["items"][0].statistics.subscriberCount;
        })
}

let getVideos = () => {
  fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${plistID}&maxResults=4&key=${apiKey}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
          console.log(data);
          for(let i = 0; thumb.length; i++){
            thumb[i].src=data["items"][i].snippet.thumbnails.high.url;
            vidTitle[i].innerHTML=data["items"][i].snippet.title;
          }
        })
}

getSubscribers();
getVideos();
