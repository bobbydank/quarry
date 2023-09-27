let tempbg = '';
let tempTitle = '';
let buttons = '';
let partviewer = '';

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
const buttonContainer = document.getElementById('button-container');

const drumpulleys = document.getElementById('drumpulleys');
const cleanflight = document.getElementById('cleanflight');
const wingpulley = document.getElementById('wingpulley');
const carryiders = document.getElementById('carryiders');
const returnidlers = document.getElementById('returnidlers');
const drives = document.getElementById('drives');
const impactbed = document.getElementById('impactbed');
const coupling = document.getElementById('coupling');
const partviewerContainer = document.getElementById('part-viewer');

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

//handles closing partviwer
document.getElementById('pv-close').addEventListener('click', function (e) {
  partviewerContainer.classList.remove('active');
  tertiaryTitle.style.opacity = "1";
});

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
  buttonContainer.style.opacity = 0;

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
      topright.style.opacity = 0;
      tempTitle = element.title;
      tertiaryTitle.classList.add('on');
      contentInner.innerHTML = element.content;
      tempbg = element.bg;
      buttons = element.buttons;

      change_video( element.video );
      video.addEventListener('loadeddata', tertiary_data_loaded(element), false);
      video.addEventListener('ended', tertiary_end, false);
    }, false);

    /* if (element.hasOwnProperty('partviewer')) {
      partviewer = element.partviewer;  
    } else {
      partviewer = '';
    }*/

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

function tertiary_data_loaded( element=null) {
  //buttons
  //console.log(buttons);
  document.getElementById('buttons').innerHTML = '';
  buttons.forEach(element => {
    if (element.title && element.url) {
      let a = createButton(element);
      
      if (element.target) {
        if (element.target == 'modal') {
          a.addEventListener('click', function (e) {
            e.preventDefault();
            console.log(this.href);

            let container = document.createElement('div');
            container.classList.add('modal');
            container.setAttribute('id', 'modal');

            let cup = document.createElement('div');
            container.classList.add('container');

            let video = document.createElement('div');
            video.classList.add('video');
            let iframe = document.createElement('iframe');
            iframe.src = this.href;
            video.appendChild(iframe);

            let close = document.createElement('img');
            close.classList.add('close');
            close.src = 'images/close-x.svg';

            close.addEventListener('click', function () {
              document.getElementById('modal').remove();
            });

            cup.appendChild(close);
            cup.appendChild(video);

            container.appendChild(cup);

            document.getElementById('page-wrap').parentNode.appendChild(container);
          });
        } else {
          a.target = element.target;
        }
      } 
      
      if (element.class) {
        a.classList.add(element.class);
      }
      
      document.getElementById('buttons').append(a);
    }
  });

  //partviewer
  
  if (element.hasOwnProperty('partviewer')) {
    partviewer = element.partviewer;  
  } else {
    partviewer = '';
  }

  if (partviewer) {
    let first = true;

    //create button
    let a = document.createElement('a');
    a.herf = "#";

    let img = document.createElement('img');
    img.alt = partviewer.title;
    if (partviewer.image) {
      img.src = partviewer.image;
    } else {
      img.src = '/images/gears.svg';
    }
    a.appendChild(img);

    let text = document.createTextNode('Part Viewer');
    a.appendChild(text);

    a.addEventListener('click', function (e) {
      document.getElementById('part-viewer').classList.add('active');
      tertiaryTitle.style.opacity = "0";
    });

    document.getElementById('buttons').append(a);

    //partviewer content
    //title
    let title = document.createElement('span');
    title.innerHTML = partviewer.title;
    document.getElementById('pv-title').appendChild(title);

    ///  ------ Start adding content
    partviewer.content.forEach(element => {
      //console.log(element);
      let num = Math.floor(Math.random() * (15 - 10 + 1)) + 10;
      let uniqueId = generateRandomString(num);

      //create button
      let a = createButton(element);
      a.setAttribute('data-id', uniqueId);

      if (first) {
        a.classList.add('active');
      }

      a.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Get current active elements
        let activeButton = document.querySelector('#pv-buttons a.active');
        let activeContent = document.querySelector('#pv-content > div.active');
  
        // Get new active elements
        let newButton = a;
        let newContentId = a.getAttribute('data-id');
        let newContent = document.querySelector(`#pv-content > div[id='${newContentId}']`);
  
        // Change active button and content
        changeActive(activeButton, newButton);
        changeActive(activeContent, newContent);
      });

      document.getElementById('pv-buttons').appendChild(a);

      //handle content
      let container = document.createElement('div');
      container.id = uniqueId
      container.classList.add(element.type);

      if (first) {
        container.classList.add('active');
        first = false;
      }

      if (element.type === 'video') {
        let videoContainer = document.createElement('div');
        videoContainer.classList.add('video-container');

        // Create video element and its source
        var video = document.createElement('video');
        video.setAttribute('id', 'partvideo');
        video.setAttribute('preload', 'metadata');
        video.setAttribute('data-id', uniqueId);

        var source = document.createElement('source');
        source.setAttribute('src', '/partviewer/videos/'+element.content);
        source.setAttribute('type', 'video/mp4');
        video.appendChild(source);

        // Create play/pause button with FontAwesome icon
        var button = document.createElement('button');
        button.setAttribute('id', 'playPauseBtn');
        button.classList.add('videoPlay');
        button.setAttribute('data-id', uniqueId);
        
        var icon = document.createElement('i');
        icon.setAttribute('class', 'fas fa-play');
        icon.setAttribute('data-id', uniqueId);
        button.appendChild(icon);

        // Create progress bar wrapper
        var sliderWrapper = document.createElement('div');
        sliderWrapper.setAttribute('id', 'sliderWrapper');

        // Create progress bar
        var progressBar = document.createElement('input');
        progressBar.setAttribute('type', 'range');
        progressBar.setAttribute('id', 'progressBar');
        progressBar.setAttribute('value', '0');
        progressBar.setAttribute('step', 'any');
        progressBar.setAttribute('min', '0');
        progressBar.setAttribute('data-id', uniqueId);
        sliderWrapper.appendChild(progressBar);

        //event listeners
        button.addEventListener('click', function(event) {
          var id2 = event.target.dataset.id;
          var topContainer = document.getElementById(id2);
          let icon2 = topContainer.querySelector('i');
          let video2 = topContainer.querySelector('video');

          if (video2.paused) {
            video2.play();
            icon2.className = 'fas fa-pause';
          } else {
            video2.pause();
            icon2.className = 'fas fa-play';
          }
        }); 
        progressBar.addEventListener('input', function(event) {
          let id = event.target.dataset.id;
          let topContainer = document.getElementById(id);
          let progressBar = topContainer.querySelector('input');
          let video = topContainer.querySelector('video');

          video.currentTime = progressBar.value;
        });
        video.onloadedmetadata = function(event) {
          let id = event.target.dataset.id;
          let topContainer = document.getElementById(id);
          let progressBar = topContainer.querySelector('input');
          let video = topContainer.querySelector('video');

          progressBar.max = video.duration;
        };   
        video.addEventListener('timeupdate', function(event) {
          let id = event.target.dataset.id;
          let topContainer = document.getElementById(id);
          let progressBar = topContainer.querySelector('input');
          let video = topContainer.querySelector('video');

          // Update the slider value
          if (!isNaN(video.duration)) {
            progressBar.value = video.currentTime;
            progressBar.max = video.duration;
          }
        });     

        // Append everything to the container
        videoContainer.appendChild(video);
        videoContainer.appendChild(button);
        videoContainer.appendChild(sliderWrapper);

        video.load();

        container.appendChild(videoContainer);
      } else if (element.type === 'image') {
        let image = document.createElement('img');
        image.src = '/partviewer/images/'+element.content;

        container.appendChild(image);
      } else if (element.type === 'content') {
        let contentContainer = document.createElement('div');
        contentContainer.classList.add('info-container');

        element.content.forEach(content => {
          let div = document.createElement('div');
          div.innerHTML = content;
          contentContainer.appendChild(div);
        });

        container.appendChild(contentContainer);
      }

      document.getElementById('pv-content').appendChild(container);
    });
  } 

  background.style.display = 'none';
  background.src = tempbg;
  video.play();
  video.removeEventListener('loadeddata', tertiary_data_loaded, false);
}

/**
 * 
 */
function tertiary_end() {
  console.log('tertiary_end');

  topright.style.opacity = 1;
  buttonContainer.style.opacity = 1;
  tertiaryTitle.innerHTML = tempTitle;
  tempTitle = '';
  background.style.display = 'block';
  jQuery('#content').addClass('on');
  video.pause(); 
  video.removeEventListener('ended', tertiary_end, false);
}

/**
 * this is the skip intro stuff. also called when the home button is called.
 */
function snap_to_start() {
  console.log('snap_to_start');
  
  jQuery('#primary li.active').removeClass('active');
  secondaryNav.innerHTML = '';
  jQuery('#content').removeClass('on');
  tertiaryTitle.classList.remove('on');
  mainnav.style.opacity = 1;
  homeButton.style.opacity = 0;
  topright.style.opacity = 0;
  topright.style.display = 'block';
  background.src = data.start.out_bg;
  skipIntro.style.display = 'none';
  background.style.display = 'block';
  introText.style.display = 'block';
  subtitle.style.opacity = 0;
  video.pause(); 
  video.removeEventListener('ended', start, false);
}

/**
 * The start of everything 
 */
function start() {
  console.log('start');
  
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

/**
 * 
 */
function out_transition(e) {
  console.log('out_transition');

  background.src = e.currentTarget.newBg;
  background.style.display = 'block';
  video.removeEventListener('ended', start, false);
}

/**
 * Swaps out the src of the background video and loads it
 */
function change_video( newVid ) {
  console.log('change_video');

  //empty partviewer
  empty_partviewer();
  
  let source = video.getElementsByTagName('source')[0];

  source.setAttribute('src', newVid);
  source.setAttribute('type', 'video/mp4');

  video.load();
}

/**
 * Removes all of the content in the partviewer
 */
function empty_partviewer() {
  console.log('empty_partviewer');

  document.getElementById('pv-title').innerHTML = "";
  document.getElementById('pv-buttons').innerHTML = "";
  document.getElementById('pv-content').innerHTML = "";
}

/**
 * Assists in creating unique IDs for the part viewer
 * 
 * @param {*} length 
 * @returns random string of characters
 */
function generateRandomString(length) {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

/**
 * helps create the buttons for the sidebar and the partviewer
 * 
 * @param {*} element 
 * @returns 
 */
function createButton(element) {
  let a = document.createElement('a');

  let img = document.createElement('img');
  img.alt = element.title;
  if (element.image) {
    img.src = element.image;
  } else {
    img.src = '/images/gears.svg';
  }
  a.appendChild(img);

  let text = document.createTextNode(element.title);
  a.appendChild(text);

  a.title = element.title;

  if (element.url) {
    a.href = element.url;
  } else {
    a.href = '#';
  }

  return a;
}

/**
 * swaps the active class on the elements passed.
 * 
 * @param {*} oldElement 
 * @param {*} newElement 
 */
function changeActive(oldElement, newElement) {
  oldElement.classList.remove('active');
  newElement.classList.add('active');
}