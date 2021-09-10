const runQuery = require('../../dbConn');
const commonResponse = require('../../helpers/index');

const deleteBlog = async (req, res) => {
  try {

    const blogId = parseInt(req.params.id, 10);

    if(!blogId){
      throw new Error('BlogId not found!');
    }

    const user = req.user;
    const userId = user.id;

    const query = `select * from blogs where id = '${blogId}'`;
    const response = await runQuery(query);

    if (response.rowCount === 0) {
      throw new Error('blog not found!');
    }

    const query1 = `DELETE from blogs where id = '${blogId}'`;
    const result = await runQuery(query1);
    const output = { ...result.rows[0]};

    return commonResponse(res, 204, output ,null);

  } catch (error) {
    return commonResponse(res, 200, null, error.message);
  }
};

module.exports = deleteBlog;
