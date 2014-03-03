let events = require('sdk/system/events');
let { Ci } = require('chrome');

let cleaners = [
  require('cleaners/amazon'),
  require('cleaners/google'),
  require('cleaners/utm'),
];

function httpOnModifyRequest(evt) {
  let channel = evt.subject.QueryInterface(Ci.nsIHttpChannel);
  if (channel.requestMethod !== 'GET') {
    return;
  }

  let url = null;
  for (let cleaner of cleaners) {
    url = cleaner.clean(channel.URI);
    if (url !== null) {
      let webnav = channel.notificationCallbacks.getInterface(Ci.nsIWebNavigation);
      webnav.loadURI(url, Ci.nsIWebNavigation.LOAD_FLAGS_NONE, null, null, null);
      return;
    }
  }
}

events.on('http-on-modify-request', httpOnModifyRequest, false);
