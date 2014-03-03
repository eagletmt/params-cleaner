let google = require('cleaners/google');
let util = require('./util');

exports['test remove redirector'] = function(assert) {
  let uri = util.makeURI('http://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&ved=0CCYQFjAA&url=http%3A%2F%2Fwanko.cc%2F&ei=8j0UU5HmGoSJlAWdgYGoAg&usg=AFQjCNF0jlKdpU9dELac-Zgi1NVTSRhzWQ&sig2=e044JNRqOpaufPjyOm-vMQ&cad=rja');
  assert.equal(google.clean(uri), 'http://wanko.cc/');
}

require('sdk/test').run(exports);
