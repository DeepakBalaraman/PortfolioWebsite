//Sticky header upon scrolling
let nav = document.querySelector("nav");
let val;
window.onscroll = function() {
  if(document.documentElement.scrollTop > 10){
    nav.classList.add("sticky");
  }else{
    nav.classList.remove("sticky");
  }

}

//Show or Hide menu icon upon menu open/close
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

//Close menu upon selecting an option
let navLinks = document.querySelectorAll(".menu li a");
for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click" , function() {
    header.classList.remove("active");
    menuBtn.style.opacity = "1";
    menuBtn.style.pointerEvents = "auto";
    body.style.overflow = "auto";
  });
}

//Fetch Live Subscribers Count and Latest Videos
let apiKey = config.ytda;
const channelID = config.ytid;
const plistID = config.ytps;
const subCount = document.querySelector('.subCount');
const viewCount = document.querySelector('.viewCount');
var sCounter, vCounter, timeout;
var flag = true;
var vidTitle = document.getElementsByClassName('vidTitle');
var thumb = document.getElementsByClassName('thumbs');
var vlink = document.getElementsByClassName('vlink');

let getSubscribers = () => {
    fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelID}&key=${apiKey}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);

            sCounter =  Math.floor(data["items"][0].statistics.subscriberCount/10)*10;
            vCounter = Math.floor(data["items"][0].statistics.viewCount/100)*100;
        })
}

let getVideos = () => {
  fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${plistID}&maxResults=6&key=${apiKey}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
          console.log(data);
          for(let i = 0; i < thumb.length; i++){
            thumb[i].src=data["items"][i].snippet.thumbnails.high.url;
            vidTitle[i].innerHTML=data["items"][i].snippet.title;
            vlink[i].href='https://youtu.be/'+data["items"][i].snippet.resourceId.videoId;
          }
        })
}

let countItUp = () => {
  subCount.innerHTML = parseInt(sCounter);
  viewCount.innerHTML = parseInt(vCounter);
  $('.subCount').each(function(){
    $(this).prop('Counter',0).animate({
        Counter: $(this).text()
    }, {
        duration: 2000,
        easing: 'swing',
        step: function (now){
            $(this).text(Math.ceil(now) + '+');
        }
    });
  });

  $('.viewCount').each(function(){
    $(this).prop('Counter',0).animate({
        Counter: $(this).text()
    }, {
        duration: 2000,
        easing: 'swing',
        step: function (now){
            $(this).text(Math.ceil(now) + '+');
        }
    });
  });
  
}

getSubscribers();
getVideos();
timeout = setTimeout(countItUp, 1000);
