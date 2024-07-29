import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import fakeRes from "../../public/data/countries.json";
const mock = new MockAdapter(axios);
mock.onGet("/country").reply(200, fakeRes);

export class MockService {
  async getCountry() {
    const res = await axios.get("/country");
    return [...res.data.data];
  }
}
