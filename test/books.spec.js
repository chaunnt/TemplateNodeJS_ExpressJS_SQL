
require('dotenv').config();

const chai = require('chai');
const chaiHttp = require('chai-http');

const { checkResponseStatus } = require('./Common');

chai.should();
chai.use(chaiHttp);
chai.use(chaiHttp);


const app = require('../app');
describe(`Tests HKD`, function() {
  before(done => {
    new Promise(async function(resolve, reject) {
      //TODO do pre process
      resolve();
    }).then(() => done());
  });

  //Sample
  it('Get list', done => {
    // const body = {
    //   "filter": {},
    //   "skip": 0,
    //   "limit": 20,
    //   "order": {}
    // };
    // chai
    //   .request(`0.0.0.0:${process.env.PORT}`)
    //   .post(`api/feedbacks/feedback-cbt`)
    //   .set({ Authorization: `Bearer ${token}` })
    //   .send(body)
    //   .end((err, res) => {
    //     if ( err ) {
    //       console.error(err);
    //     }
    //     checkResponseStatus(res, 200);
    //     idTestItem = res.body.data.resultData[0]._id;
    //     done();
    //   });
      done();
  });
});
