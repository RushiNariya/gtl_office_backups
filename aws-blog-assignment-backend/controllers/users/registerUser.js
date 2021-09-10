const runQuery = require('../../dbConn');
const { encryptPassword } = require('../../utils/bcryptUtils');
const commonResponse = require('../../helpers/index');
const sendMail = require('../../utils/send-email');

const validateBody = (firstName, lastName, role, email, password) => {
    if(!firstName || !lastName || !role || !email || !password){
      return false;
    }
    return true;
  }

const registerUser = async (req, res) => {
    try {
        const {firstName, lastName, role, email, password} = req.body;

        if(!validateBody(firstName, lastName, role, email, password)){
            throw new Error('please enter required data to login!');
          }
        const bcryptPassword = encryptPassword(password);
    
        const response = await runQuery(`select * from users where email = '${email}'`);
        if(response.rowCount){
            throw new Error('User already exist');
        }
        const query = `insert into users (first_name, last_name, role, email, password) values('${firstName}', '${lastName}', '${role}','${email}', '${bcryptPassword}')` 
        
        const result = await runQuery(query);

        const mailResponse = await sendMail(email, password);

        const output = { ...result.rows[0]};
        return commonResponse(res, 201, output ,null);
    } catch (err) {
        return commonResponse(res, 200, null, err.message);
    }
}

module.exports = {registerUser};