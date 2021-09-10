const runQuery = require('../../dbConn');
const commonResponse = require('../../helpers/index');

const validateBody = ( blogTitle, description, category, tags) => {
  if(!blogTitle || !description || !category || !tags){
    return false;
  }
  return true;
}

const addBlog = async (req, res) => {
  try {
    const { blogTitle, description, category, tags } = req.body;
    const user = req.user;
    const authorId = user.id;

    if(!validateBody( blogTitle, description, category, tags)){
      throw new Error('please enter required data!');
    }

    const query = `insert into blogs (blog_title, blog_description, blog_category, blog_tags, blog_author, blog_image) values('${blogTitle}', '${description}', '${category}','${tags}', '${authorId}', '${req.file.key}')`;

    const result = await runQuery(query);
    const output = { ...result.rows[0]};
    
    return commonResponse(res, 201, output ,null);

  } catch (error) {

    return commonResponse(res, 200, null, error.message);
  }
};

module.exports = addBlog;
