const runQuery = require('../../dbConn');
const commonResponse = require('../../helpers/index');

const getBlogById = async (req, res) => {
  try {

    const blogId = parseInt(req.params.id, 10);

    if(!blogId){
      throw new Error('BlogId not found!');
    }

    const user = req.user;
    const userId = user.id;

    const query = `select b.blog_title, b.blog_date, b.blog_description, b.blog_image , b.blog_tags, b.blog_title, b.id, c.category_name, c.id as category_id , u.first_name , u.last_name, u.email, u."role" from blogs b join blog_category c on b.blog_category = c.id join users u on b.blog_author = u.id where b.id = '${blogId}'`;
    const response = await runQuery(query);

    if (response.rowCount === 0) {
      throw new Error('blog not found!');
    }

    const output = { ...response.rows[0]};

    return commonResponse(res, 200, output ,null);

  } catch (error) {
    return commonResponse(res, 200, null, error.message);
  }
};

module.exports = getBlogById;
