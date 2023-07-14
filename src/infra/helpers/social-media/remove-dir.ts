import * as fs from "fs";

const deleteDirectory = () => {
  if (fs.existsSync(process.cwd() + "/output/uploads"))
    return fs.rmSync(process.cwd() + "/output/uploads", {
      recursive: true,
      force: true,
    });
};

export default deleteDirectory;
