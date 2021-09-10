import Creator from '../Model/Creator';
import { comparePassword } from '../utils/bcryptUtils';
import { generateToken } from '../utils/jwtUtils';
import commonResponse from '../helper/index';

module.exports = async ({ input }) => {
  try {
    const { email, password } = input;

    if(!email || !password){
      throw new Error('login cridentials are required!');
    }

    const user = await Creator.findOne({ email: email });
    if (!user) {
      throw new Error('user not found!');
    }
    const checkPassword = comparePassword(password, user.password);
    if (!checkPassword) {
      throw new Error('Incorrect password!');
    }

    const token = generateToken({
      id: user._id,
      email: user.email,
      role: user.role,
      // password: user.password,
    });

    // const result = { token: token};
    return commonResponse('success', {token: token, id: user._id, role: user.role }, null);
  } catch (error) {
    return commonResponse('error', null, error.message);
  }
};