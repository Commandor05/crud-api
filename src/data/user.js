import { v4 as uuidv4 } from 'uuid';

export class User {
  constructor (user) {
    const { username, age, hobbies } = user;
    this.id = uuidv4();
    this.username = username; 
    this.age = age; 
    this.hobbies = hobbies.length > 0 ? hobbies : []; 
  }

  static isValid(user){
    if (typeof user !== 'object') {
      return false;
    }

    if (!('username' in user && 'age' in user && 'hobbies' in user)) {
      return false;
    }

    const { username, age, hobbies } = user;

    if (typeof username !== 'string') {
      return false;
    }

    if (typeof age !== 'number') {
      return false;
    }

    if (!Array.isArray(hobbies)) {
      return false;
    }

    if (!(username.trim())) {
      return false;
    }

    if (age <= 0) {
      return false;
    }
 
    return true;
  }
}