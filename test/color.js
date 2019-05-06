process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let Color = require("../models/color");

let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../app");
let should = chai.should();

chai.use(chaiHttp);

describe("Colors", () => {
  // Before each test we empty database
  beforeEach((done) => {
    Color.remove({}, (err) => {
      done();
    });
  });

  describe("/GET color", () => {
    it("it should GET all the colors", (done) => {
      chai
        .request(app)
        .get("/api/colors")
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

  describe("/POST color", () => {
    it("it should not POST a color without color_description field", (done) => {
      let color = {};
      chai
        .request(app)
        .post("/api/colors")
        .send(color)
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          // res.body.should.have.property("errors");
          done();
        });
    });

    it("it should POST a color", (done) => {
      let color = {
        color_description: "Black"
      };
      chai
        .request(app)
        .post("/api/colors")
        .send(color)
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res);
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("Color create successfully");
          res.body.data.should.have.property("color_description");
          done();
        });
    });
  });

  describe("/GET/:color_id color", () => {
    it("it should GET detail of color by given id", (done) => {
      let color = new Color({ color_description: "White" });
      color.save((err, color) => {
        chai
          .request(app)
          .get("/api/colors/" + color.id)
          .end((err, res) => {
            should.not.exist(err);
            should.exist(res);
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have
              .property("message")
              .eql("Color retrieve successfully");
            res.body.data.should.have
              .property("color_description")
              .eql("White");
            res.body.data.should.have.property("_id").eql(color.id);
            done();
          });
      });
    });
  });

  describe("/PUT/:color_id color", () => {
    it("it should UPDATE a color given the id", (done) => {
      let color = new Color({ color_description: "yellow" });
      let updatedColor = { color_description: "Blue" };
      color.save((err, color) => {
        chai
          .request(app)
          .put("/api/colors/" + color.id)
          .send(updatedColor)
          .end((err, res) => {
            should.not.exist(err);
            should.exist(res);
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("message").eql("Color updated");
            res.body.data.should.have.property("color_description").eql("Blue");
            done();
          });
      });
    });
  });
});
