import Creator from '../Model/Creator';
import commonResponse from '../helper/index';

module.exports = async (_, context) => {
  try {
    const contextResult = await context();
    if (contextResult) {

      if (contextResult.role !== 'Admin') {
        throw new Error('User is not authorized!');
      }

      const creators = await Creator.find({ role: 'Author'});

      if(!creators){
        throw new Error('no authors found');
      }
      return commonResponse('success', creators, null);
    } else {
      throw new Error('please login !!');
    }
  } catch (error) {
    return commonResponse('error', null, error.message);
  }
};