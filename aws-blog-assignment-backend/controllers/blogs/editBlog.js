const runQuery = require('../../dbConn');
const commonResponse = require('../../helpers/index');

const validateBody = ( blogTitle, description, category, tags) => {
  if(!blogTitle || !description || !category || !tags){
    return false;
  }
  return true;
}

const editBlog = async (req, res) => {
  try {
    let updateQuery;
    const { blogTitle, description, category, tags } = req.body;

    const blogId = parseInt(req.params.id, 10);
    
    const user = req.user;
    const userId = user.id;

    if(!blogId){
      throw new Error('BlogId not found!');
    }

    const query = `select * from blogs where id = '${blogId}'`;
    const response = await runQuery(query);
    if (response.rowCount === 0) {
      throw new Error('blog not found!');
    }
    
    if(!validateBody( blogTitle, description, category, tags)){
      throw new Error('please enter required data!');
    }

    if(req.file){
      updateQuery = `update blogs set blog_title='${blogTitle}', blog_description='${description}', blog_category='${category}', blog_tags='${tags}', blog_image='${req.file.key}' where id = '${blogId}'`;
    }
    else{
      updateQuery = `update blogs set blog_title='${blogTitle}', blog_description='${description}', blog_category='${category}', blog_tags='${tags}' where id = '${blogId}'`;
    }



    const result = await runQuery(updateQuery);
    const output = { ...result.rows[0]};
    return commonResponse(res, 204, output ,null);

  } catch (error) {
    return commonResponse(res, 200, null, error.message);
  }
};

module.exports = editBlog;
