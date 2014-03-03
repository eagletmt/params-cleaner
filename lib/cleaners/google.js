exports.clean = cleanGoogleUrl;

let querystring = require('util/querystring');

const GOOGLE_HOSTS = [
  'www.google.com',
  'www.google.co.jp',
];

function cleanGoogleUrl(aURI) {
  if (GOOGLE_HOSTS.indexOf(aURI.host) === -1) {
    return null;
  }
  let pos = aURI.path.indexOf('?');
  if (pos === -1) {
    return null;
  }
  let path = aURI.path.substring(0, pos);
  if (path !== '/url') {
    return null;
  }
  let params = querystring.parse(aURI.path.substring(pos+1));
  if (!params.hasOwnProperty('url')) {
    return null;
  }
  return decodeURIComponent(params.url);
}
