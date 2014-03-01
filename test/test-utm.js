let utm = require('cleaners/utm');
let util = require('./util');

exports['test remove utm_* params'] = function(assert) {
  let uri = util.makeURI('http://example.com/content.html?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed&p=2&p=3&utm_content=livedoor&page=2');
  assert.equal(utm.clean(uri), 'http://example.com/content.html?p=2&p=3&page=2');
};

require('sdk/test').run(exports);
