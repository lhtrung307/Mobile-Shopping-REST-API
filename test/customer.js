process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let Customer = require("../models/customer");
let testServices = require("./test-services");

let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../app");
let should = chai.should();

chai.use(chaiHttp);

let model_name = "customer";
let path = "customers";
let id_param = "customer_id";

describe("Customers", () => {
  // Before each test we empty database
  beforeEach((done) => {
    Customer.remove({}, (err) => {
      done();
    });
  });

  describe(`/GET ${model_name}`, () =>
    testServices.testGetList(model_name, path));

  describe(`/POST ${model_name}`, () => {
    it(`it should not POST a ${model_name} without first_name field`, (done) => {
      let customer = {
        gender: "Nam",
        last_name: "Friend",
        email: "abc@gmai.com",
        password: "123",
        phone_number: "01234"
      };
      chai
        .request(app)
        .post(`/api/${path}`)
        .send(customer)
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          res.body.message.should.have.property("errors");
          done();
        });
    });

    it(`it should POST a ${model_name}`, (done) => {
      let customer = {
        gender: "Nam",
        first_name: "Hello My",
        last_name: "Friend",
        email: "abc@gmai.com",
        password: "123",
        phone_number: "01234"
      };
      chai
        .request(app)
        .post(`/api/${path}`)
        .send(customer)
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res);
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("Customer create successfully");
          res.body.data.should.be.a("object");
          res.body.data.should.have.property("last_name").eql("Friend");
          done();
        });
    });
  });

  describe(`/GET/:${id_param} ${model_name}`, () => {
    it(`it should GET detail of ${model_name} by given id`, (done) => {
      let customer = new Customer({
        gender: "Nam",
        first_name: "Hello My",
        last_name: "Friend",
        email: "abc@gmai.com",
        password: "123",
        phone_number: "01234"
      });
      customer.save((err, customer) => {
        chai
          .request(app)
          .get(`/api/${path}/` + customer.id)
          .end((err, res) => {
            should.not.exist(err);
            should.exist(res);
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have
              .property("message")
              .eql("Customer retrieve successfully");
            res.body.data.should.have.property("first_name").eql("Hello My");
            res.body.data.should.have.property("_id").eql(customer.id);
            done();
          });
      });
    });
  });

  describe(`/PUT/:${id_param} ${model_name}`, () => {
    it(`it should UPDATE a ${model_name} given the id`, (done) => {
      let customer = new Customer({
        gender: "Nam",
        first_name: "Hello My",
        last_name: "Friend",
        email: "abc@gmai.com",
        password: "123",
        phone_number: "01234"
      });
      let updatedCustomer = { gender: "Nữ" };
      customer.save((err, customer) => {
        chai
          .request(app)
          .put(`/api/${path}/` + customer.id)
          .send(updatedCustomer)
          .end((err, res) => {
            should.not.exist(err);
            should.exist(res);
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("message").eql("Customer updated");
            res.body.data.should.have.property("gender").eql("Nữ");
            done();
          });
      });
    });
  });
});
