let amazon = require('cleaners/amazon');
let util = require('./util');

exports['test remove unnecessary params'] = function(assert) {
  let uri = util.makeURI('http://www.amazon.co.jp/gp/product/B009WQ63AE/ref=s9_simh_gw_p351_d0_i7?pf_rd_m=AN1VRQENFRJN5&pf_rd_s=center-5&pf_rd_r=0KTB3ERFSFSFGFDXSGH3&pf_rd_t=101&pf_rd_p=155416549&pf_rd_i=489986');
  assert.equal(amazon.clean(uri), 'http://www.amazon.co.jp/gp/product/B009WQ63AE');
};

exports['test remove unnecessary search params'] = function(assert) {
  let uri = util.makeURI('http://www.amazon.co.jp/s/ref=amb_link_67287229_3?ie=UTF8&bbn=2151981051&rh=i%3Acomputers%2Cn%3A2127209051%2Cn%3A!2127210051%2Cn%3A2151981051%2Cp_36%3A5000000-5999900&pf_rd_m=AN1VRQENFRJN5&pf_rd_s=center-8&pf_rd_r=0YYR0SG6VRK7C0BM2WTG&pf_rd_t=101&pf_rd_p=137582329&pf_rd_i=489986');
  assert.equal(amazon.clean(uri), 'http://www.amazon.co.jp/s?rh=n%3A2127209051%2Cn%3A!2127210051%2Cn%3A2151981051%2Cp_36%3A5000000-5999900');
};

exports["test don't modify other site's params"] = function(assert) {
  let uri = util.makeURI('http://example.com/gp/product/B009WQ63AE/ref=s9_simh_gw_p351_d0_i7?pf_rd_m=AN1VRQENFRJN5&pf_rd_s=center-5&pf_rd_r=0KTB3ERFSFSFGFDXSGH3&pf_rd_t=101&pf_rd_p=155416549&pf_rd_i=489986');
  assert.equal(amazon.clean(uri), null);
};

require('sdk/test').run(exports);
