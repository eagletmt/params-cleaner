exports.clean = cleanUtmParams;

let querystring = require('util/querystring');

// https://support.google.com/analytics/answer/1033867
const IGNORE_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_term',
  'utm_content',
  'utm_campaign',
];

function cleanUtmParams(aURI) {
  let path = aURI.path;
  let pos = path.indexOf('?');
  if (pos === -1) {
    return null;
  }

  let params = querystring.parse(path.substring(pos+1));
  let modified = false;
  for (let k of IGNORE_PARAMS) {
    if (params.hasOwnProperty(k)) {
      modified = true;
      delete params[k];
    }
  }
  if (!modified) {
    return null;
  }

  let url = aURI.prePath + path.substring(0, pos);
  if (Object.getOwnPropertyNames(params) != 0) {
    url += '?' + querystring.stringify(params);
  }
  return url;
}
