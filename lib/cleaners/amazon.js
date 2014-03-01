exports.clean = cleanAmazonParams;

let querystring = require('sdk/querystring');

const IGNORE_PARAMS = [
  '_encoding',
  'ie',
  'pf_rd_i',
  'pf_rd_m',
  'pf_rd_p',
  'pf_rd_r',
  'pf_rd_s',
  'pf_rd_t',
  'refRID',
  'colid',
  'coliid',
];

function cleanAmazonParams(aURI) {
  if (aURI.host !== 'www.amazon.co.jp') {
    return null;
  }

  let pos = aURI.path.indexOf('?');
  let path, params;
  if (pos === -1) {
    path = aURI.path;
    params = {};
  } else {
    path = aURI.path.substring(0, pos);
    params = querystring.parse(aURI.path.substring(pos+1));
  }

  let modified = false;

  for (let k of IGNORE_PARAMS) {
    if (params.hasOwnProperty(k)) {
      modified = true;
      delete params[k];
    }
  }

  const REF_RE = /\/ref=[0-9A-Za-z_-]+/;
  if (REF_RE.test(path)) {
    modified = true;
    path = path.replace(REF_RE, '');
  }

  if (!modified) {
    return null;
  }

  let url = aURI.prePath + path;
  if (Object.getOwnPropertyNames(params).length !== 0) {
    url += '?' + querystring.stringify(params);
  }
  return url;
}
