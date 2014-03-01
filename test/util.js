let { Cc, Ci } = require('chrome');

exports.makeURI = function makeURI(aURL) {
  return Cc['@mozilla.org/network/io-service;1'].getService(Ci.nsIIOService).newURI(aURL, null, null);
};
