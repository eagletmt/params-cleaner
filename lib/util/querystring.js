exports.parse = parse;
exports.stringify = stringify;

// NOTE: Key-value pairs are NOT [un]escaped.

function parse(query, separator, assignment) {
  separator = separator || '&';
  assignment = assignment || '=';

  let params = {};
  for (let chunk of query.split(separator)) {
    let pair = chunk.split(assignment, 2);
    if (!params.hasOwnProperty(pair[0])) {
      params[pair[0]] = [];
    }
    params[pair[0]].push(pair[1]);
  }
  return params;
}

function stringify(params, separator, assignment) {
  separator = separator || '&';
  assignment = assignment || '=';

  let query = [];
  for (let k in params) {
    let vs = params[k];
    if (!Array.isArray(vs)) {
      vs = [vs];
    }

    for (let v of vs) {
      query.push(k + assignment + v);
    }
  }
  return query.join(separator);
}
