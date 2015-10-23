function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

var flickrData;
var photoIndex = 0;

var setPhoto = function(data, photoIndex) {
  var imgUrl = data.items[photoIndex]['media']['m'].replace("_m", "_b");
  document.getElementById('title').innerHTML = data.items[photoIndex].title;
  document.getElementById('thumbnail').src = imgUrl;
  document.getElementById('popout').src = imgUrl;
}

ready(function(){
  $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
  
  {
      tags: "cats",
      tagmode: "any",
      format: "json"
  },

  function(data) {
    setPhoto(data, photoIndex)
    flickrData = data;
  });

  var prevButton = document.getElementById('previous')
  var nextButton = document.getElementById('next')

  nextButton.onclick = function() {
    if(photoIndex >= flickrData.items.length) {
      alert('this is the last image in the set!')
    } else {
      photoIndex += 1;
      setPhoto(flickrData, photoIndex);
    }
  };

  prevButton.onclick = function() {
    if(photoIndex < 1) {
      alert('this is the first image in the set!')
    } else {
      photoIndex -= 1;
      setPhoto(flickrData, photoIndex);
    }
  };


});