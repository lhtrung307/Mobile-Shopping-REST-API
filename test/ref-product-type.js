process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let RefProductType = require("../models/ref-product-type");

let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../app");
let should = chai.should();

chai.use(chaiHttp);

describe("RefProductTypes", () => {
  // Before each test we empty database
  beforeEach((done) => {
    RefProductType.remove({}, (err) => {
      done();
    });
  });

  describe("/GET ref-product-type", () => {
    it("it should GET all the ref product types", (done) => {
      chai
        .request(app)
        .get("/api/ref-product-types")
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

  describe("/POST ref-product-type", () => {
    it("it should not POST a ref product type without product_type_code field", (done) => {
      let refProductType = {
        product_type_description: "Xiaomi"
      };
      chai
        .request(app)
        .post("/api/ref-product-types")
        .send(refProductType)
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          res.body.message.should.have.property("errors");
          done();
        });
    });

    it("it should POST a ref product type", (done) => {
      let refProductType = {
        product_type_code: "Xiaomi",
        product_type_description: "Xiaomi"
      };
      chai
        .request(app)
        .post("/api/ref-product-types")
        .send(refProductType)
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res);
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("Create Ref Product Types successfully");
          res.body.data.should.be.a("object");
          res.body.data.should.have.property("product_type_code").eql("Xiaomi");
          done();
        });
    });
  });

  describe("/GET/:ref-product-type_id ref-product-type", () => {
    it("it should GET detail of ref product type by given id", (done) => {
      let refProductType = new RefProductType({
        product_type_code: "Samsung",
        product_type_description: "Samsung"
      });
      refProductType.save((err, refProductType) => {
        chai
          .request(app)
          .get("/api/ref-product-types/" + refProductType.id)
          .end((err, res) => {
            should.not.exist(err);
            should.exist(res);
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have
              .property("message")
              .eql("Ref Product Type retrieve successfully");
            res.body.data.should.be.a("object");
            res.body.data.should.have
              .property("product_type_code")
              .eql("Samsung");
            res.body.data.should.have.property("_id").eql(refProductType.id);
            done();
          });
      });
    });
  });

  describe("/PUT/:ref-product-type_id ref-product-type", () => {
    it("it should UPDATE a ref product type given the id", (done) => {
      let refProductType = new RefProductType({
        product_type_code: "Motorola",
        product_type_description: "Huawei"
      });
      let updatedRefProductType = { product_type_code: "Huawei" };
      refProductType.save((err, refProductType) => {
        chai
          .request(app)
          .put("/api/ref-product-types/" + refProductType.id)
          .send(updatedRefProductType)
          .end((err, res) => {
            should.not.exist(err);
            should.exist(res);
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have
              .property("message")
              .eql("Ref Product Type updated");
            res.body.data.should.be.a("object");
            res.body.data.should.have
              .property("product_type_code")
              .eql("Huawei");
            res.body.data.should.have.property("_id").eql(refProductType.id);
            done();
          });
      });
    });
  });
});
