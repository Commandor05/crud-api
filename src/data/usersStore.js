import { User } from './user.js';

class UsersStore {

  constructor() {
    if (!UsersStore._instance) {
      this.users = []; 
      UsersStore._instance = this;
    }
    return UsersStore._instance;
  }

  static getInstance() {
    return this._instance;
  }

  add(user) {   
    const newUser = new User(user);
    this.users.push(newUser);
    return newUser;
  }

  getById(param) {
    return this.users.find(({ id }) => id === param);
  }

  getAll() {
    return this.users;
  }

  update(param, payload) {
    const index = this.users.findIndex(({ id }) => id === param);

    if (index >= 0) {
      const { username, age, hobbies } = payload;
      const user = new User(payload);
      user.id = param

      this.username = username; 
      this.age = age; 
      this.hobbies = hobbies.length > 0 ? hobbies : []; 
      this.users.splice(index, 1, user);
      return user;
    } else {
      return false;
    }
  }

  delete(param) {
    const index = this.users.findIndex(({ id }) => id === param);

    if (index >= 0) {
      this.users.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }
}

export default UsersStore;