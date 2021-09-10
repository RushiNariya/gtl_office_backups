var AWS = require('aws-sdk');

AWS.config.update({ region: process.env.REGION });

const sendMail = async (email, password) => {
  try {
    const params = {
      Destination: {
        ToAddresses: [`${email}`],
      },
      Message: {
        Body: {
          Text: {
            Charset: 'UTF-8',
            Data: `username: ${email}, password: ${password}`,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: 'Registration Successful',
        },
      },
      Source: 'rushipatel9650@gmail.com',
    };

    const sendPromise = await new AWS.SES().sendEmail(params).promise();

    return { status: 'sent', messageId: sendPromise.MessageId };
  } catch (error) {
    return { status: 'error', error: error.message };
  }
};

module.exports = sendMail;
