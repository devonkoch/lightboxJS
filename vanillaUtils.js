function xmlToJson(xml) {
  // Create the return object
  var returnedJson = {};
  if (xml.nodeType === 1) { // element
    // do attributes
    if (xml.attributes.length > 0) {
    returnedJson["@attributes"] = {};
      for (var j = 0; j < xml.attributes.length; j++) {
        var attribute = xml.attributes.item(j);
        returnedJson["@attributes"][attribute.nodeName] = attribute.nodeValue;
      }
    }
  } else if (xml.nodeType === 3) { // text
    returnedJson = xml.nodeValue;
  }
  // do children
  if (xml.hasChildNodes()) {
    for(var i = 0; i < xml.childNodes.length; i++) {
      var item = xml.childNodes.item(i);
      var nodeName = item.nodeName;
      if (typeof(returnedJson[nodeName]) === "undefined") {
        returnedJson[nodeName] = xmlToJson(item);
      } else {
        if (typeof(returnedJson[nodeName].push) === "undefined") {
          var old = returnedJson[nodeName];
          returnedJson[nodeName] = [];
          returnedJson[nodeName].push(old);
        }
        returnedJson[nodeName].push(xmlToJson(item));
      }
    }
  }
  return returnedJson;
};

function domReady(fn) {
  window.location = '?#';
  if (document.readyState !== 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
};

function RESTfullyGet(url, successHandler, errorHandler) {
  var xhr = typeof XMLHttpRequest !== 'undefined'
    ? new XMLHttpRequest()
    : new ActiveXObject('Microsoft.XMLHTTP');
  xhr.open('get', url, true);
  xhr.onreadystatechange = function() {
    var status;
    // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
    if (xhr.readyState === 4) { // `DONE`
      status = xhr.status;
      if (status === 200) {
        successHandler && successHandler(xhr)
      } else {
        errorHandler && errorHandler(status);
      }
    }
  };
  xhr.send();
};


var baseUrl = 'https://api.flickr.com/services/rest/?method=';
var apiKey = '&api_key=e3b60e6e06b54bce8d40a791b3594344';

function createUsernameUrl(username) {
  return baseUrl + 'flickr.people.findByUsername' + apiKey + '&username=' + username;
};

function createPublicPhotoUrl(userId) {
  return baseUrl + 'flickr.people.getPublicPhotos' + apiKey + '&user_id=' + userId;
};

function createSourceUrl(farmId, serverId, id, secret, size) {
  return 'https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '_z.jpg'
};

function getUserPhotos(name, callback) {
  RESTfullyGet(createUsernameUrl(name), function(response) {
    var id = xmlToJson(response.responseXML).rsp.user['@attributes'].id;
    RESTfullyGet(createPublicPhotoUrl(id), function(response) {
      var response = xmlToJson(response.responseXML).rsp.photos.photo;
      callback(response);
    }, function(status){
      alert('success and then failure')
    });
  }, function(status) {
    alert('total failure');
  });
};
