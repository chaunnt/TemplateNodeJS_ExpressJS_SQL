
require('dotenv').config();

const chai = require('chai');
const chaiHttp = require('chai-http');

const { checkResponseStatus } = require('./Common');

chai.should();
chai.use(chaiHttp);
chai.use(chaiHttp);

const app = require('../app');

describe(`Tests Books`, function() {
  before(done => {
    new Promise(async function(resolve, reject) {
      //TODO do pre process
      resolve();
    }).then(() => done());
  });

  //Sample
  it('Get list books', done => {
    const token = "token";
    const params = {
      "searchText": "",
      "skip": 0,
      "limit": 20
    };
    chai
      .request(`0.0.0.0:${process.env.PORT}`)
      .get(`/api/books/books?limit=${params.limit}&skip=${params.skip}&searchText=${params.searchText}`)
      .set({ Authorization: `Bearer ${token}` })
      .end((err, res) => {
        if ( err ) {
          console.error(err);
        }
        checkResponseStatus(res, 200);
        done();
      });
  });
});
