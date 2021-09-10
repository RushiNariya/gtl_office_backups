import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Creator from '../Model/Creator';

const generateToken = (payload) => {
  const userInfo = {
    id: payload.id,
    email: payload.email,
    role: payload.role
  };
  // console.log(userInfo);
  const token = jwt.sign(userInfo, process.env.JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '1h',
  });
  return token;
};

const ensureToken = async (req) => {
  const bearerHeader = req.headers.authorization || null;
  if (bearerHeader) {
    const token = bearerHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await Creator.findOne({ email: decoded.email });

      if (user) {
        return { creatorId: user._id, role: user.role, };
      } else {
        throw new Error('user not exists!');
      }
    } catch (error) {
      throw new Error('Error occured!!');
    }
  } else {
    return null;
  }
};

module.exports = { generateToken, ensureToken };
