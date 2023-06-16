/* testing code for partviewer */
var partvideo = document.getElementById('partvideo');
var playPauseBtn = document.getElementById('playPauseBtn');
var progressBar = document.getElementById('progressBar');

// Event listener for the play/pause button
playPauseBtn.addEventListener('click', function() {
  var icon = playPauseBtn.querySelector('i');

  if (partvideo.paused) {
    partvideo.play();
    icon.className = 'fas fa-pause';
  } else {
    partvideo.pause();
    icon.className = 'fas fa-play';
  }
});

// Event listener for the progress bar
progressBar.addEventListener('input', function() {
  partvideo.currentTime = progressBar.value;
});

// Update the progress bar as the video plays
partvideo.addEventListener('timeupdate', function() {
  // Update the slider value
  if (!isNaN(partvideo.duration)) {
    var progress = partvideo.currentTime / partvideo.duration * 100;
    progressBar.value = partvideo.currentTime;
    progressBar.max = partvideo.duration;
  }
});

// Load video duration on metadata load
video.onloadedmetadata = function() {
  progressBar.max = partvideo.duration;
};

//swaps active classes
function changeActive(oldElement, newElement) {
  oldElement.classList.remove('active');
  newElement.classList.add('active');
}

window.onload = function() {
  let buttons = document.querySelectorAll('#pv-buttons a');

  buttons.forEach(function(button) {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get current active elements
      let activeButton = document.querySelector('#pv-buttons a.active');
      let activeContent = document.querySelector('#pv-content > div.active');

      // Get new active elements
      let newButton = button;
      let newContentId = button.getAttribute('data-id');
      let newContent = document.querySelector(`#pv-content > div[id='${newContentId}']`);

      // Change active button and content
      changeActive(activeButton, newButton);
      changeActive(activeContent, newContent);
    });
  });
}