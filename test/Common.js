const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const jsonComparer = require('deep-diff');
const { readFile } = require('fs');

function checkResponseStatus(res, expected) {
  if (res.body.code !== expected) {
    console.log('========Request=======');
    console.log(res.request.url);
    console.log(res.request.method);
    console.log(res.request._header);
    console.log(res.request._data);
    console.log('========Response======');
    console.log(res.body);
    console.log(res.body.code);
    console.log(expected);
  }
  expect(res.body.code).to.equal(expected);
}

var lhs = {
  name: 'my object',
  description: "it's an object!",
  details: {
    it: 'has',
    an: 'array',
    with: ['a', 'few', 'elements'],
  },
};

/* sample */
// var rhs = {
//   body: {
//     name: 'updated object',
//     description: 'it\'s an object!',
//     details: {
//       it: 'has',
//       an: 'array',
//       with: ['a', 'few', 'more', 'elements', { than: 'before' }]
//     }
//   }
// };
// checkResponseBody(rhs, './test/sample.json');

async function checkResponseBody(res, templatePath) {
  if (res.body === undefined) {
    console.log('========Request=======');
    console.log(res.request.url);
    console.log(res.request.method);
    console.log(res.request._header);
    console.log(res.request._data);
    console.log('========Response======');
    console.log(res.body);
  }

  return new Promise((resolve, reject) => {
    readFile(templatePath, 'utf8', (err, data) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      let templateData = JSON.parse(data);

      let matchResult = jsonComparer(templateData, res.body);
      const TOTALLY_MATCHED = undefined;

      if (matchResult !== TOTALLY_MATCHED) {
        for (let i = 0; i < matchResult.length; i++) {
          const result = matchResult[i];
          if (result.kind === 'N' || result.kind === 'D') {
            console.log(result);
          }
          if (result.kind === 'E') {
            if (result.lhs && result.lhs !== null && result.lhs.it && result.lhs.an) {
              console.log(result);
              expect(result.lhs.an).to.not.equal('array');
            } else if (result.rhs && result.rhs !== null && result.rhs.it && result.rhs.an) {
              console.log(result);
              expect(result.rhs.an).to.not.equal('array');
            }
          }
          expect(result.kind).to.not.equal('N');
          expect(result.kind).to.not.equal('D');
        }
      }
      resolve(matchResult);
    });
  });
}

module.exports = {
  checkResponseStatus,
  checkResponseBody,
};
