const { User } = require("./model");
const { TokenService } = require("../../utility");

class UserService {
  static async createUser() {
    try {
      const userInfo = {
        username: Math.random().toString(36).substring(2, 7).toUpperCase(),
      };
      const user = await User.create(userInfo);
      const token = await TokenService.signToken(user.id);
      return {
        token,
        username: userInfo.username,
      };
    } catch (err) {
      throw err;
    }
  }
}

module.exports = {
  UserService,
};
