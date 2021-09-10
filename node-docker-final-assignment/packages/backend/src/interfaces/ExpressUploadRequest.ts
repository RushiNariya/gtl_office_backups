import { Request } from 'express';
import { UploadedFile } from 'express-fileupload';

export interface ExpressUploadRequest extends Request{
  file?: UploadedFile
}