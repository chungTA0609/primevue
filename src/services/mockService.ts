import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import fakeRes from "../../public/data/countries.json";
import fakeResProduuct from "../../public/data/products.json";
import fakeResProductSmall from "../../public/data/products-small.json";
import fakeResProductOrderSmall from "../../public/data/products-orders-small.json";
import fakeResProductOrder from "../../public/data/products-orders.json";
const mock = new MockAdapter(axios);
mock.onGet("/country").reply(200, fakeRes);
mock.onGet("/product-small").reply(200, fakeResProductSmall);
mock.onGet("/product-order-small").reply(200, fakeResProductOrderSmall);
mock.onGet("/product-order").reply(200, fakeResProductOrder);
mock.onGet("/products").reply(200, fakeResProduuct);

export class MockService {
  async getCountry() {
    const res = await axios.get("/country");
    return [...res.data.data];
  }
  async getProductsSmall() {
    const res = await axios.get("/product-small");

    return [...res.data.data];
  }

  async getProducts() {
    const res = await axios.get("/products");
    return [...res.data.data];
  }

  async getProductsMixed() {
    const res = await axios.get("/product-small");
    return [...res.data.data];
  }

  async getProductsWithOrdersSmall() {
    const res = await axios.get("/product-order-small");
    return [...res.data.data];
  }

  async getProductsWithOrdersLarge() {
    const res = await axios.get("/product-order");
    return [...res.data.data];
  }
}
