const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
  region: process.env.REGION,
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG, PNG and JPEG is allowed!'), false);
  }
};

const storage = multerS3({
  acl: 'public-read',
  s3,
  bucket: 'rushi-blog-images',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  metadata: function (req, file, cb) {
    cb(null, { contentType: file.mimetype });
  },
  key: function (req, file, cb) {
    cb(null, Date.now().toString() + '.' + file.mimetype.split('/')[1]);
  },
});

const upload = multer({
  fileFilter,
  storage: storage,
});

module.exports = upload;