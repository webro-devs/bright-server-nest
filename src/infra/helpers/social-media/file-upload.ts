import * as fs from 'fs';
import { images } from '..';
import { HttpException } from '../../validation';
const { CImage, CImage3 } = images;

const mkdir = async (dir) => {
  return await fs.mkdirSync(dir, { recursive: true });
};

const SocialMediaService = async (
  news,
  newsDirName,
  key,
  isMain,
  instagramImage?,
) => {
  try {
    if (
      !fs.existsSync(process.cwd() + `/output/uploads/${newsDirName}/${key}`)
    ) {
      await mkdir(process.cwd() + `/output/uploads/${newsDirName}/${key}/`);
    }
    if (isMain) {
      await CImage({
        imgPath: news[key].file,
        imgName:
          `uploads/${newsDirName}/${key}/` + news[key].file.split('/').at(-1),
        txt:
          news[key].title.length > 102
            ? news[key].title.slice(0, 99) + '...'
            : news[key].title,
        ctgs: news.categories?.map((ctg) => ctg[key]),
      });
      return `${newsDirName}/${key}/` + news[key].file.split('/').at(-1);
    } else {
      await CImage3({
        imgName:
          `uploads/${newsDirName}/${key}/` + instagramImage.split('/').at(-1),
        imgPath: instagramImage,
      });
      return '';
    }
  } catch (err) {
    throw new HttpException(true, 500, err.message);
  }
};

export default SocialMediaService;
