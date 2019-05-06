process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let RefOrderStatus = require("../models/ref-order-status");

let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../app");
let should = chai.should();

chai.use(chaiHttp);

describe("RefOrderStatus", () => {
  // Before each test we empty database
  beforeEach((done) => {
    RefOrderStatus.remove({}, (err) => {
      done();
    });
  });

  describe("/GET ref-order-status", () => {
    it("it should GET all the ref-order-status", (done) => {
      chai
        .request(app)
        .get("/api/ref-order-status-codes")
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res);
          res.should.have.status(200);
          res.body.data.should.be.a("array");
          res.body.data.length.should.be.eql(0);
          done();
        });
    });
  });

  describe("/POST ref-order-status", () => {
    it("it should not POST a ref order status without order_status_code field", (done) => {
      let refOrderStatus = {
        order_status_description: "Dat hang"
      };
      chai
        .request(app)
        .post("/api/ref-order-status-codes")
        .send(refOrderStatus)
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          res.body.message.should.have.property("errors");
          done();
        });
    });

    it("it should POST a ref-order-status", (done) => {
      let refOrderStatus = {
        order_status_code: "DH",
        order_status_description: "Dat Hang"
      };
      chai
        .request(app)
        .post("/api/ref-order-status-codes")
        .send(refOrderStatus)
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res);
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("Ref Order Status Code create successfully");
          res.body.data.should.be.a("object");
          res.body.data.should.have.property("order_status_code").eql("DH");
          done();
        });
    });
  });

  describe("/GET/:order_status_code_id ref-order-status", () => {
    it("it should GET detail of ref order status by given id", (done) => {
      let refOrderStatus = new RefOrderStatus({
        order_status_code: "MH",
        order_status_description: "Mua hang"
      });
      refOrderStatus.save((err, refOrderStatus) => {
        chai
          .request(app)
          .get("/api/ref-order-status-codes/" + refOrderStatus.id)
          .end((err, res) => {
            should.not.exist(err);
            should.exist(res);
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have
              .property("message")
              .eql("Ref Order Status Code retrieve successfully");
            res.body.data.should.be.a("object");
            res.body.data.should.have.property("order_status_code").eql("MH");
            res.body.data.should.have.property("_id").eql(refOrderStatus.id);
            done();
          });
      });
    });
  });

  describe("/PUT/:ref-order-status-code_id ref-order-status", () => {
    it("it should UPDATE a ref order status given the id", (done) => {
      let refOrderStatus = new RefOrderStatus({
        order_status_code: "CTTs",
        order_status_description: "Cho Thanh Toan"
      });
      let updatedRefOrderStatus = {
        order_status_code: "CTT",
        order_status_description: "Cho Thanh Toan"
      };
      refOrderStatus.save((err, refOrderStatus) => {
        chai
          .request(app)
          .put("/api/ref-order-status-codes/" + refOrderStatus.id)
          .send(updatedRefOrderStatus)
          .end((err, res) => {
            should.not.exist(err);
            should.exist(res);
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have
              .property("message")
              .eql("Ref Order Status Code updated");
            res.body.data.should.be.a("object");
            res.body.data.should.have.property("order_status_code").eql("CTT");
            done();
          });
      });
    });
  });
});
