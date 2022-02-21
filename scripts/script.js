//Sticky header upon scrolling
let nav = document.querySelector("nav");
window.onscroll = function() {
  if(document.documentElement.scrollTop > 10)
    nav.classList.add("sticky");
  else
    nav.classList.remove("sticky");
}

//change nav icon colors based on navbar background
let homeicon = document.getElementById("homeicon");
let abouticon = document.getElementById("abouticon");
let videoicon = document.getElementById("videoicon");
let contacticon = document.getElementById("contacticon");
var pClass = nav.classList.contains('nav.sticky');
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if(mutation.attributeName == "class"){
            var nClass = mutation.target.classList.contains('sticky');
            if(pClass !== nClass)    {
                pClass = nClass;

                if(window.matchMedia("(max-width: 900px)").matches){
                    if(nClass){
                      homeicon.setAttribute("colors","primary:#343434,secondary:#0078d7,tertiary:#e4e4e4,quaternary:#343434");
                      abouticon.setAttribute("colors","primary:#343434,secondary:#000000,tertiary:#008fff,quaternary:#f3c3ba,quinary:#008fff");
                      videoicon.setAttribute("colors","primary:#3a3347,secondary:#0078d7,tertiary:#008fff");
                      contacticon.setAttribute("colors","primary:#0078d7,secondary:#545454,teritary:#008fff");
                    }
                    else{
                      homeicon.setAttribute("colors","primary:#888888,secondary:#008fff,tertiary:#888888,quaternary:#ffffff");
                      abouticon.setAttribute("colors","primary:#ffffff,secondary:#000000,tertiary:#008fff,quaternary:#f3c3ba,quinary:#008fff");
                      videoicon.setAttribute("colors","primary:#ffffff,secondary:#0078d7,tertiary:#008fff");
                      contacticon.setAttribute("colors","primary:#888888,secondary:#ffffff,teritary:#008fff");
                    }
                }
            }
        }
    });
});
observer.observe(nav, {attributes: true});

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

const state=['play', 'play', 'play', 'play'];
const media=['yt', 'tw', 'ig', 'fb'];
const ids=['yticon', 'twicon', 'igicon', 'fbicon'];
var animation = [];
var animStart = [15, 0, 0, 0];
var animMid = [28, 27, 14, 14];

for(let i = 0; i < media.length; i++){
    animation[i] = lottie.loadAnimation({
    container: document.getElementById(ids[i]),
    path: 'icons/' + media[i] + '.json',
    renderer: 'svg',
    loop: false,
    autoplay: false,
  });
  animation[i].goToAndStop(animStart[i], true);
}

$('.mediaicon').each(hoverAnimation)


function hoverAnimation(i, element){
  $(element).hover(function(){
    if(state[i] === 'play') {
      animation[i].setDirection(1);
      animation[i].play();
      animation[i].loop = true;
      state[i] = 'pause';
    } else {
      animation[i].setDirection(-1);
      animation[i].play();
      animation[i].loop = false;
      state[i] = 'play';
    }
  });
}

getSubscribers();
getVideos();
timeout = setTimeout(countItUp, 1000);
