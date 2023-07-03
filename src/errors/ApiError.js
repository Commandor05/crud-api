import { HTTPCodes } from "../router/router.js";

class ApiError extends Error {
  constructor(message, status = HTTPCodes.BAD_REQUEST) {
    super(message);
    this.status = status;
  }
}

export const ErrorMessages = {
  ID_NOT_EXISTS: "The record with id not exists",
  NO_PARAMS: "URL pameters expected",
  WRONG_ID_FORMAT: "Wrong id format",
  NOT_WALID_DATA_FORMAT: "Not walid data format",
  INVALUD_URL: "Invalid URL",
  METHOD_NOT_SUPPORTED: "Method not supported",
  UNKNOWN_ERROR: "Unknown error",
};

export default ApiError;
