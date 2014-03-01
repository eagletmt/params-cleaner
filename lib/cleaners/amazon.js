exports.clean = cleanAmazonParams;

let querystring = require('util/querystring');

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
  'ref_',
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

  if (path === '/s') {
    if (cleanSearchParams(params)) {
      modified = true;
    }
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

const IGNORE_SEARCH_PARAMS = [
  'bbn',
  'qid',
  'rnid',
];
const IGNORE_SEARCH_RH = [
  'i',
];

function cleanSearchParams(params) {
  let modified = false;

  for (let k of IGNORE_SEARCH_PARAMS) {
    if (params.hasOwnProperty(k)) {
      modified = true;
      delete params[k];
    }
  }

  if (params.hasOwnProperty('rh')) {
    const RH_SEPARATOR = encodeURIComponent(',');
    const RH_ASSIGNMENT = encodeURIComponent(':');

    let rh = querystring.parse(params.rh[0], RH_SEPARATOR, RH_ASSIGNMENT);
    for (let k of IGNORE_SEARCH_RH) {
      if (rh.hasOwnProperty(k)) {
        modified = true;
        delete rh[k];
      }
    }

    params.rh = [querystring.stringify(rh, RH_SEPARATOR, RH_ASSIGNMENT)];
  }

  return modified;
}
