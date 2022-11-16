let rawdata = '{"start":{"bg":"\/images\/home.jpg","out_video":"\/videos\/0_Intro_trimmed_sped_up_compressed.mp4","out_bg":"\/images\/master-background.jpg","in_video":false}}';

const data = JSON.parse(rawdata);
const video = document.getElementById('video');
const background = document.getElementById('background');
const introText = document.getElementById('introText');
const skipIntro = document.getElementById('skip');
const requestQuote = document.getElementById('requestquote');
const mainnav = document.getElementById('mainnav');

(function ($) {

  $(document).ready(function() {
    skipIntro.addEventListener('click', snap_to_start, false);

    //start
    video.load();
    $('#startbutton').click(function () {
      $('.start, #background').fadeOut(100, function () {
        skipIntro.style.display = 'block';
        background.src = data.start.out_bg;
        video.addEventListener('ended', start, false);
        video.play();
      });
    });

    $('#logo').click(function () {
      skipIntro.style.display = 'none';
      background.src = data.start.bg;
      $('.start, #background').css('display', 'block');
      mainnav.style.opacity = 0;
      introText.style.display = 'none';
      requestQuote.style.display = 'none';

      change_video( data.start.out_video );
    });
  }); 
    
})(jQuery);

function snap_to_start() {
  mainnav.style.opacity = 1;
  requestQuote.style.display = 'block';
  background.src = data.start.out_bg;
  skipIntro.style.display = 'none';
  background.style.display = 'block';
  introText.style.display = 'block';
  video.pause(); 
  video.removeEventListener('ended', start, false);
}

function start() {
  mainnav.style.opacity = 1;
  requestQuote.style.display = 'block';
  skipIntro.style.display = 'none';
  background.style.display = 'block';
  introText.style.display = 'block';
  video.removeEventListener('ended', start, false);
}

function out_transition(e) {
  background.src = e.currentTarget.newBg;
  background.style.display = 'block';
  video.removeEventListener('ended', start, false);
}

function change_video( newVid ) {
  let source = video.getElementsByTagName('source')[0];

  source.setAttribute('src', newVid);
  source.setAttribute('type', 'video/mp4');

  video.load();
}