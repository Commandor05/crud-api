import { HTTPCodes } from '../router/router.js';

export default class Controller {
  sendResponse(res, data, status = HTTPCodes.OK) {
    res.statusCode = status;
    res.end(JSON.stringify(data));
  }

  async getBody(req) {
    const buffers = [];

    for await (const chunk of req) {
      buffers.push(chunk);
    }
  
    const rawData = Buffer.concat(buffers).toString();
  
    const data = JSON.parse(rawData);
    return data;
  }
}