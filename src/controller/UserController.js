import { getUrlParam } from '../router/router.js';
import Controller from './controller.js';
import { HTTPCodes } from './../router/router.js'
import { User } from '../data/user.js';
import ApiError, { ErrorMessages } from '../errors/ApiError.js'

export  default class UserController extends Controller {
  constructor(usersStore) {
    super();
    this.usersStore = usersStore;
  }

  getAll(req, res) {
    const data = this.usersStore.getAll();
    this.sendResponse(res, data);
  }

  getOne(req, res) {
    const param = getUrlParam(req);
    if (!param) {
      throw new ApiError(ErrorMessages.NO_PARAMS);
    }

    if (!User.isValidUserId(param)) {
      throw new ApiError(ErrorMessages.WRONG_ID_FORMAT);
    }

    const data = this.usersStore.getById(param);

    if (data) {
      this.sendResponse(res, data);
    } else {
      this.sendResponse(res, { message: ErrorMessages.ID_NOT_EXISTS }, HTTPCodes.NOT_FOUND);
    }
  }

  async create(req, res) {
    const user = await this.getBody(req);
    if (!User.isValid(user)) {
      throw ApiError(ErrorMessages.NOT_WALID_DATA_FORMAT);
    }
    const data = this.usersStore.add(user);
    this.sendResponse(res, data, HTTPCodes.CREARED);
  }

  async update(req, res) {
    const param = getUrlParam(req);
    if (!param) {
      throw new ApiError(ErrorMessages.NO_PARAMS);
    }

    if (!User.isValidUserId(param)) {
      throw new ApiError(ErrorMessages.WRONG_ID_FORMAT);
    }

    const payload = await this.getBody(req);

    if (!User.isValid(payload )) {
      throw ApiError(ErrorMessages.NOT_WALID_DATA_FORMAT);
    }
    
    const data = this.usersStore.update(param, payload);
    
    if (data) {
      this.sendResponse(res, data, HTTPCodes.OK);
    } else {
      this.sendResponse(res, { message: ErrorMessages.ID_NOT_EXISTS }, HTTPCodes.NOT_FOUND);
    }
  }

  delete(req, res) {
    const param = getUrlParam(req);
    if (!param) {
      throw new ApiError(ErrorMessages.NO_PARAMS);
    }

    if (!User.isValidUserId(param)) {
      throw new ApiError(ErrorMessages.WRONG_ID_FORMAT);
    }

    const data = this.usersStore.delete(param);
    
    if (data) {
      this.sendResponse(res, null, HTTPCodes.NO_CONTENT);
    } else {
      this.sendResponse(res, { message: ErrorMessages.ID_NOT_EXISTS }, HTTPCodes.NOT_FOUND);
    }
  }
}