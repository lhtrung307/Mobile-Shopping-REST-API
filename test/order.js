process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let Order = require("../models/order");
let RefOrderStatus = require("../models/ref-order-status");
let Customer = require("../models/customer");
let testServices = require("./test-services");

let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../app");
let should = chai.should();

chai.use(chaiHttp);

let model_name = "order";
let path = "orders";
let id_param = "order_id";

describe("Orders", () => {
  // Before each test we empty database
  beforeEach((done) => {
    Order.remove({}, (err) => {
      RefOrderStatus.remove({}, (err) => {
        Customer.remove({}, (err) => {
          done();
        });
      });
    });
  });

  describe(`/GET ${model_name}`, () =>
    testServices.testGetList(model_name, path));

  describe(`/POST ${model_name}`, () => {
    it(`it should not POST a ${model_name} without order_status_code field`, (done) => {
      let customer = new Customer({
        gender: "Nam",
        first_name: "Hello My",
        last_name: "Friend",
        email: "abc@gmai.com",
        password: "123",
        phone_number: "01234"
      });
      customer.save((err) => {
        let order = {
          customer: customer.id,
          order_details: "Nothing here"
        };
        chai
          .request(app)
          .post(`/api/${path}`)
          .send(order)
          .end((err, res) => {
            should.not.exist(err);
            should.exist(res);
            res.body.should.be.a("object");
            res.body.should.have.property("message");
            res.body.message.should.have.property("errors");
            done();
          });
      });
    });

    it(`it should POST a ${model_name}`, (done) => {
      let customer = new Customer({
        gender: "Nam",
        first_name: "Hello My",
        last_name: "Friend",
        email: "abc@gmai.com",
        password: "123",
        phone_number: "01234"
      });
      customer.save();
      let refOrderStatus = new RefOrderStatus({
        order_status_code: "DH",
        order_status_description: "Dat Hang"
      });
      refOrderStatus.save();
      let order = {
        customer: customer.id,
        order_status_code: refOrderStatus.id,
        order_details: "Nothing here"
      };
      chai
        .request(app)
        .post(`/api/${path}`)
        .send(order)
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res);
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("Order create successfully");
          res.body.data.should.be.a("object");
          res.body.data.should.have
            .property("order_status_code")
            .eql(refOrderStatus.id);
          res.body.data.should.have.property("customer").eql(customer.id);
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
      customer.save();
      let refOrderStatus = new RefOrderStatus({
        order_status_code: "DH",
        order_status_description: "Dat Hang"
      });
      refOrderStatus.save();
      let order = new Order({
        customer: customer.id,
        order_status_code: refOrderStatus.id,
        order_details: "Nothing here"
      });
      order.save((err, product) => {
        chai
          .request(app)
          .get(`/api/${path}/` + order.id)
          .end((err, res) => {
            should.not.exist(err);
            should.exist(res);
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have
              .property("message")
              .eql("Order retrieve successfully");
            res.body.data.should.have.property("customer").eql(customer.id);
            res.body.data.should.have.property("_id").eql(order.id);
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
      customer.save();
      let refOrderStatus = new RefOrderStatus({
        order_status_code: "DH",
        order_status_description: "Dat Hang"
      });
      refOrderStatus.save();
      let anotherRefOrderStatus = new RefOrderStatus({
        order_status_code: "CTT",
        order_status_description: "Cho Thanh Toan"
      });
      anotherRefOrderStatus.save();
      let order = new Order({
        customer: customer.id,
        order_status_code: refOrderStatus.id,
        order_details: "Nothing here"
      });
      let updatedOrder = { order_status_code: anotherRefOrderStatus.id };
      order.save((err, order) => {
        chai
          .request(app)
          .put(`/api/${path}/` + order.id)
          .send(updatedOrder)
          .end((err, res) => {
            should.not.exist(err);
            should.exist(res);
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("message").eql("Order updated");
            res.body.data.should.have
              .property("order_status_code")
              .eql(anotherRefOrderStatus.id);
            done();
          });
      });
    });
  });
});
