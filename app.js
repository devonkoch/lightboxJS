function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function(){
    
  $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
  
  {
      tags: "cat",
      tagmode: "any",
      format: "json"
  },
  
  function(data) {
      var random = Math.floor(Math.random() * data.items.length);
      var image_src = data.items[random]['media']['m'].replace("_m", "_b");
      document.getElementById('title').innerHTML = data.items[random].title;
      document.getElementById('thumbnail').src = image_src;
      document.getElementById('popout').src = image_src;
  });

});
