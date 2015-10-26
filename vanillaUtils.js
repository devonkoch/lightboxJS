function domReady(fn) {

  window.location = '?#';

  if (document.readyState !== 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
};

function RESTfullyGet(url, callback) {
  function createRequest() {
    var result = null;
    if (window.XMLHttpRequest) {
      // for Chrome, FireFox, Safari, etc.
      result = new XMLHttpRequest();
      if (typeof result.overrideMimeType !== 'undefined') {
        result.overrideMimeType('text/xml'); // Or anything else
      }
    }
    else if (window.ActiveXObject) {
      // handles Internet Explorer 5/6+
      result = new ActiveXObject("Microsoft.XMLHTTP");
    } 
    else {
      return; // something went wrong
    }
    return result;
  };

  var request = createRequest();
  // Create the callback:
  request.onreadystatechange = function() {
    if (request.readyState !== 4) {
      return; // Not there yet
    } 
    if (request.status !== 200) {
      return; // Handling request failure here...
    }
    // Request successful, read the response, do more stuff
    var response = request.responseText;
    callback(response);

  };

  request.open("GET", url, true);
  request.send();
};

var baseUrl = 'https://api.flickr.com/services/rest/?method=';
var apiKey = '&api_key=e3b60e6e06b54bce8d40a791b3594344';
var jsonConvert = '&format=json&nojsoncallback=1';

function createUsernameUrl(username) {
  return baseUrl + 'flickr.people.findByUsername' + apiKey + '&username=' + username + jsonConvert;
};

function createPublicPhotoUrl(userId) {
  return baseUrl + 'flickr.people.getPublicPhotos' + apiKey + '&user_id=' + userId + jsonConvert;
};

function createSourceUrl(farmId, serverId, id, secret, size) {
  return 'https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '_z.jpg'
};

function getUserPhotos(name, callback) {
  RESTfullyGet(createUsernameUrl(name), function(response) {
    response = JSON.parse(response);
    console.dir(response);
    RESTfullyGet(createPublicPhotoUrl(response.user.id), function(response) {
      response = JSON.parse(response);
      callback(response.photos.photo);
    });
  });
};
