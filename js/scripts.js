let tempbg = '';

const data = JSON.parse(rawdata);
const logo = document.getElementById('logo');
const startbutton = document.getElementById('startbutton');
const video = document.getElementById('video');
const background = document.getElementById('background');
const introText = document.getElementById('introText');
const skipIntro = document.getElementById('skip');
const topright = document.getElementById('topright');
const mainnav = document.getElementById('mainnav');
const homeButton = document.getElementById('home_button');
const tertiaryTitle = document.getElementById('tertiary_title');
const secondaryNav = document.getElementById('secondary');
const subtitle = document.getElementById('subtitle');
const content = document.getElementById('content');
const scrolldown = document.getElementById('scroll_down');
const scrollup = document.getElementById('scroll_up');
const contentInner = document.getElementById('content_inner');

const drumpulleys = document.getElementById('drumpulleys');
const cleanflight = document.getElementById('cleanflight');
const wingpulley = document.getElementById('wingpulley');
const carryiders = document.getElementById('carryiders');
const returnidlers = document.getElementById('returnidlers');
const drives = document.getElementById('drives');
const impactbed = document.getElementById('impactbed');
const coupling = document.getElementById('coupling');

//scroll
scrolldown.addEventListener('click', function () {
  contentInner.scrollBy(0,50);
}, false);
scrollup.addEventListener('click', function () {
  contentInner.scrollBy(0,-50);
}, false);

//mainnav
drumpulleys.addEventListener('click', function (e) {
  main_nav_click( data.drumpulleys, e );
}, false);
cleanflight.addEventListener('click', function (e) {
  main_nav_click( data.cleanflight, e );
}, false);
wingpulley.addEventListener('click', function (e) {
  main_nav_click( data.wingpulley, e );
}, false);
carryiders.addEventListener('click', function (e) {
  main_nav_click( data.carryiders, e );
}, false);
returnidlers.addEventListener('click', function (e) {
  main_nav_click( data.returnidlers, e );
}, false);
drives.addEventListener('click', function (e) {
  main_nav_click( data.drives, e );
}, false);
impactbed.addEventListener('click', function (e) {
  main_nav_click( data.impactbed, e );
}, false);
coupling.addEventListener('click', function (e) {
  main_nav_click( data.coupling, e );
}, false);

//other stuff
skipIntro.addEventListener('click', snap_to_start, false);

//start
video.load();
startbutton.addEventListener('click', function () {
  jQuery('.start').fadeOut(100);
  jQuery('#primary li.active').removeClass('active');
  secondaryNav.innerHTML = '';
  background.style.display = 'none';
  skipIntro.style.display = 'block';
  background.src = data.start.out_bg;
  video.addEventListener('ended', start, false);
  video.play();
}, false);

logo.addEventListener('click', function () {
  //console.log('here');
  change_video( data.start.out_video );
  secondaryNav.innerHTML = '';
  skipIntro.style.display = 'none';
  jQuery('.start').css('display', 'block');
  mainnav.style.opacity = 0;
  introText.style.display = 'none';
  topright.style.display = 'none';
  homeButton.style.opacity = 0;
  subtitle.style.opacity = 0;
  content.classList.remove('on');
  background.src = data.start.bg;
  background.style.display = 'block';
}, false);

homeButton.addEventListener('click', function () {
  let o = homeButton.style.opacity;
  if (o == 1) {
    snap_to_start();
  }
}, false);

//functions
function main_nav_click( data, event ) {
  jQuery('#primary li.active').removeClass('active');
  event.target.classList.add('active');

  //console.log('main_nav_click');
  background.src = '/images/master-background.jpg';
  background.style.display = 'block';

  //turn off
  content.classList.remove('on');
  introText.style.display = 'none';
  topright.style.opacity = 0;

  //empty
  secondaryNav.innerHTML = '';
  subtitle.innerHTML = '';
  contentInner.innerHTML = '';

  //subnav
  data.subnav.forEach(element => {
    //console.log(element);
    const navitem = document.createElement('li');
    navitem.innerHTML = element.title;

    navitem.addEventListener('click', function (e) {
      jQuery('#secondary li.active').removeClass('active');
      e.target.classList.add('active');

      background.src = '/images/master-background.jpg';
      background.style.display = 'block';

      //console.log('navitem');
      content.classList.remove('on');
      subtitle.style.opacity = 0;
      tertiaryTitle.innerHTML = element.title;
      tertiaryTitle.classList.add('on');
      contentInner.innerHTML = element.content;
      tempbg = element.bg;

      change_video( element.video );
      video.addEventListener('loadeddata', tertiary_data_loaded, false);
      video.addEventListener('ended', tertiary_end, false);
    }, false);

    secondaryNav.appendChild(navitem);
  });

  //title
  subtitle.innerHTML = data.title;

  //turn on
  homeButton.style.opacity = 1;
  tertiaryTitle.style.opacity = 1;
  secondaryNav.style.opacity = 1;
  subtitle.style.opacity = 1;
}

function tertiary_data_loaded() {
  background.style.display = 'none';
  background.src = tempbg;
  video.play();
  video.removeEventListener('loadeddata', tertiary_data_loaded, false);
}

function tertiary_end() {
  //console.log('tertiary_end');

  topright.style.opacity = 1;
  background.style.display = 'block';
  jQuery('#content').addClass('on');
  video.pause(); 
  video.removeEventListener('ended', tertiary_end, false);
}

function snap_to_start() {
  //console.log('snap_to_start');
  jQuery('#primary li.active').removeClass('active');
  secondaryNav.innerHTML = '';
  jQuery('#content').removeClass('on');
  tertiaryTitle.classList.remove('on');
  mainnav.style.opacity = 1;
  homeButton.style.opacity = 0;
  topright.style.display = 'block';
  background.src = data.start.out_bg;
  skipIntro.style.display = 'none';
  background.style.display = 'block';
  introText.style.display = 'block';
  video.pause(); 
  video.removeEventListener('ended', start, false);
}

function start() {
  //console.log('start');
  jQuery('#primary li.active').removeClass('active');
  secondaryNav.innerHTML = '';
  mainnav.style.opacity = 1;
  //homeButton.style.opacity = 1;
  topright.style.display = 'block';
  skipIntro.style.display = 'none';
  background.style.display = 'block';
  introText.style.display = 'block';
  video.removeEventListener('ended', start, false);
}

function out_transition(e) {
  //console.log('out_transition');

  background.src = e.currentTarget.newBg;
  background.style.display = 'block';
  video.removeEventListener('ended', start, false);
}

function change_video( newVid ) {
  //console.log('change_video');
  let source = video.getElementsByTagName('source')[0];

  source.setAttribute('src', newVid);
  source.setAttribute('type', 'video/mp4');

  video.load();
}