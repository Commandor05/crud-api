import UsersStore from '../data/usersStore.js';
import UserController from '../controller/UserController.js'
import ApiError, { ErrorMessages } from '../errors/ApiError.js';

const HTTPMethods = Object.freeze({
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PUT: 'PUT',
});

export const HTTPCodes = Object.freeze({
  OK: '200',
  CREARED: '201',
  NO_CONTENT: '204',
  BAD_REQUEST: '400',
  NOT_FOUND: '404'
});

export const router = async (req, res) => {
  const { method, url } = req;
  const urlParts = url.split('/');

  if (!isValidRoute(urlParts)) {
    res.statusCode = HTTPCodes.BAD_REQUEST;
    res.end(JSON.stringify(ErrorMessages.INVALUD_URL));
  }

  const usersStore = UsersStore.getInstance();
  const userController = new UserController(usersStore);
  const message = { message: ErrorMessages.UNKNOWN_ERROR };

  try {
    switch (method) {
      case HTTPMethods.GET:
        if (getUrlParam(req)) {
          userController.getOne(req, res);
        } else {
          userController.getAll(req, res);
        }
        break;
      case HTTPMethods.POST:
        await userController.create(req, res);
        break;
      case HTTPMethods.DELETE:
        userController.delete(req, res);
        break;
      case HTTPMethods.PUT:
        await userController.update(req, res);
        break;
      default:
        throw ApiError(ErrorMessages.METHOD_NOT_SUPPORTED);
    }
  } catch(e) {
    res.statusCode = HTTPCodes.BAD_REQUEST;
    if (e instanceof ApiError) {
      const { message: errorMessage, status } = e;
      message.message = errorMessage;
      res.statusCode = status;
    }
    
    res.end(JSON.stringify(message));
  }
}

const isValidRoute = (urlParts) => {
  if (urlParts < 3 && urlParts > 4) {
    return false;
  }

  if (!(urlParts[1] === 'api' &&  urlParts[2] === 'user')) {
    return false;
  }

  return true;
} 

export const getUrlParam = (req) => {
  const urlParts = req.url.split('/');
  if (!isValidRoute(urlParts)) {
    throw new ApiError(ErrorMessages.INVALUD_URL);
  }

  const urlParam = urlParts.length === 4 ? urlParts[3] : null;
  return urlParam;
}