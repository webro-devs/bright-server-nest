import * as AdmZip from 'adm-zip';
import { HttpException } from '../../validation';
import * as fs from 'fs';

const ZipMaker = async () => {
  try {
    if (fs.existsSync(process.cwd() + '/output/uploads')) {
      const zip = new AdmZip();
      await zip.addLocalFolder(process.cwd() + '/output/uploads');
      const response = await zip.toBuffer();
      return { data: response, isNaN: false };
    } else return { data: null, isNaN: true };
  } catch (err) {
    throw new HttpException(true, 500, err.message);
  }
};

export default ZipMaker;
