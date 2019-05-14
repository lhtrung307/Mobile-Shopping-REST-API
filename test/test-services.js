let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../app");
let should = chai.should();

chai.use(chaiHttp);

module.exports.testGetList = (model_name, path) => {
  it(`it should GET all the ${model_name}`, (done) => {
    chai
      .request(app)
      .get(`/api/${path}`)
      .end((err, res) => {
        should.not.exist(err);
        should.exist(res);
        res.should.have.status(200);
        res.body.data.should.be.a("array");
        res.body.data.length.should.be.eql(0);
        done();
      });
  });
};
