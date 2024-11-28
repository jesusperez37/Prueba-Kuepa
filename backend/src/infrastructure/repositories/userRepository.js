const User = require("../../core/models/User");

class UserRepository {
  static async createUser(userData) {
    return User.create(userData);
  }

  static async findUserByUsername(usuario) {
    return User.findOne({ usuario });
  }
}

module.exports = UserRepository;
