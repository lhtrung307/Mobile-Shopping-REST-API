process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let Product = require("../models/product");
let RefProductType = require("../models/ref-product-type");
let Color = require("../models/color");
let testServices = require("./test-services");

let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../app");
let should = chai.should();

chai.use(chaiHttp);

let model_name = "product";
let path = "products";
let id_param = "product_id";

describe("Products", () => {
  // Before each test we empty database
  beforeEach((done) => {
    Product.remove({}, (err) => {
      RefProductType.remove({}, (err) => {
        Color.remove({}, (err) => {
          done();
        });
      });
    });
  });

  describe(`/GET ${model_name}`, () =>
    testServices.testGetList(model_name, path));

  describe(`/POST ${model_name}`, () => {
    it(`it should not POST a ${model_name} without product_type_code field`, (done) => {
      let color = new Color({
        color_description: "Blue"
      });
      color.save((err) => {
        let product = {
          name: "Samsung galaxy",
          price: "1000000",
          colors: color.id,
          size: "5.0"
        };
        chai
          .request(app)
          .post(`/api/${path}`)
          .send(product)
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
      let product_type_code = new RefProductType({
        product_type_code: "Huawei",
        product_type_description: "Huawei"
      });
      product_type_code.save();
      let color = new Color({
        color_description: "Black"
      });
      color.save();
      let product = {
        product_type_code: product_type_code.id,
        name: "Samsung galaxy",
        price: "1000000",
        colors: color.id,
        size: "5.0"
      };
      chai
        .request(app)
        .post(`/api/${path}`)
        .send(product)
        .end((err, res) => {
          should.not.exist(err);
          should.exist(res);
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("Product create successfully");
          res.body.data.should.be.a("object");
          res.body.data.should.have
            .property("product_type_code")
            .eql(product_type_code.id);
          res.body.data.should.have.property("name").eql("Samsung galaxy");
          done();
        });
    });
  });

  describe(`/GET/:${id_param} ${model_name}`, () => {
    it(`it should GET detail of ${model_name} by given id`, (done) => {
      let product_type_code = new RefProductType({
        product_type_code: "Huawei",
        product_type_description: "Huawei"
      });
      product_type_code.save();
      let color = new Color({
        color_description: "Black"
      });
      color.save();
      let product = new Product({
        product_type_code: product_type_code.id,
        name: "Samsung galaxy",
        price: "1000000",
        colors: color.id,
        size: "5.0"
      });
      product.save((err, product) => {
        chai
          .request(app)
          .get(`/api/${path}/` + product.id)
          .end((err, res) => {
            should.not.exist(err);
            should.exist(res);
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have
              .property("message")
              .eql("Product retrieve successfully");
            res.body.data.should.have.property("name").eql("Samsung galaxy");
            res.body.data.should.have.property("_id").eql(product.id);
            done();
          });
      });
    });
  });

  describe(`/PUT/:${id_param} ${model_name}`, () => {
    it(`it should UPDATE a ${model_name} given the id`, (done) => {
      let product_type_code = new RefProductType({
        product_type_code: "Huawei",
        product_type_description: "Huawei"
      });
      product_type_code.save();
      let color = new Color({
        color_description: "Black"
      });
      color.save();
      let product = new Product({
        product_type_code: product_type_code.id,
        name: "Samsung galaxy",
        price: "1000000",
        colors: color.id,
        size: "5.0"
      });
      let updatedProduct = { name: "Huawei new" };
      product.save((err, _product) => {
        chai
          .request(app)
          .put(`/api/${path}/` + product.id)
          .send(updatedProduct)
          .end((err, res) => {
            should.not.exist(err);
            should.exist(res);
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("message").eql("Product updated");
            res.body.data.should.have.property("name").eql("Huawei new");
            done();
          });
      });
    });
  });
});
