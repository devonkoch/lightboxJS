(function(){
  var letters    = document.getElementsByTagName('span');
  var title      = document.getElementById('title');
  var thumbnail  = document.getElementById('thumbnail');
  var popout     = document.getElementById('popout');
  var submit     = document.getElementById('submit');
  var buttons    = document.getElementsByTagName('section')[0];
  var prevButton = document.getElementById('previous');
  var nextButton = document.getElementById('next');

  var flickrData = null;
  var photoIndex = 0;

  function setPhoto(data, photoIndex) {
    data = data[photoIndex]['@attributes'];
    thumbnail.src = createSourceUrl(data.farm, data.server, data.id, data.secret);
    title.innerHTML = data.title !== '' ? data.title + ':' : '(no title)';
    popout.src = thumbnail.src.replace("_z", "_b"); // changing from medium to large source
  };

  domReady(function() {
    submit.onclick = function() {

      buttons.style.display = "block";
      var input = document.getElementById('username').value;
      
      getUserPhotos(input, function(response) {
        setPhoto(response, photoIndex); // setting first photo
        flickrData = response;
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
})();
