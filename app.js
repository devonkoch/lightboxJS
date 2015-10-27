var elements = {
  // todo  
};

var title      = document.getElementById('title');
var thumbnail  = document.getElementById('thumbnail');
var popout     = document.getElementById('popout');
var submit     = document.getElementById('submit');
// var form       = document.getElementsByTagName('form')[0];
var buttons    = document.getElementsByTagName('section')[0];
var prevButton = document.getElementById('previous');
var nextButton = document.getElementById('next');

var flickrData = null;
var photoIndex = 0;

function setPhoto(data, photoIndex) {
  data = data[photoIndex];  
  thumbnail.src = createSourceUrl(data.farm, data.server, data.id, data.secret);
  title.innerHTML = data.title !== '' ? data.title + ':' : '(no title)';
  popout.src = thumbnail.src.replace("_z", "_b"); // changing from medium to large source
};

function blinky() {
  var colors = ['6ECADC', 'E9A820', 'E01563', '3EB991'];
  var elements = document.querySelectorAll('span');
  Array.prototype.forEach.call(elements, function(el, i){
    el.style.color = colors[Math.floor(Math.random() * colors.length)];
  });
};

domReady(function() {
  setInterval(blinky, 250);

  submit.onclick = function() {

    buttons.style.display = "block";
    
    photoIndex = 0;
    var input = document.getElementById('username').value;
    
    getUserPhotos(input, function(data) {
      setPhoto(data, photoIndex); // setting first photo
      flickrData = data;
    });

  };

  nextButton.onclick = function() {
    if(photoIndex >= flickrData.length) {
      alert('this is the last image in the set!')
    } else {
      photoIndex += 1;
      setPhoto(flickrData, photoIndex);
    }
  };

  prevButton.onclick = function() {
    if(photoIndex < 1) {
      alert('this is the first image in the set!');
    } else {
      photoIndex -= 1;
      setPhoto(flickrData, photoIndex);
    }
  };

});


