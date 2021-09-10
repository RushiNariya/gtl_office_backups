const runQuery = require('../../dbConn');
const commonResponse = require('../../helpers/index');

const getAllCategory = async (req, res) => {
  try {

    const user = req.user;
    const userId = user.id;

    const query = `select category_name from blog_category`;
    const response = await runQuery(query);

    if (response.rowCount === 0) {
      throw new Error('categories not found!');
    }
    const output = { ...response.rows};

    return commonResponse(res, 200, output ,null);

  } catch (error) {
    return commonResponse(res, 200, null, error.message);
  }
};

module.exports = getAllCategory;
