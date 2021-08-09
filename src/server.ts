import * as express from "express";
import * as fileupload from "express-fileupload";
import { parseCv } from "./cv-parser";

const app = express();

app.use(fileupload());

app.post("/dev/cv-parser", async (req, res) => {
  try {
    let uploadedFiles = Object.values(req.files);
    const files = (
      Array.isArray(uploadedFiles[0]) ? uploadedFiles[0] : uploadedFiles
    ) as {
      name: string;
      data: Buffer;
    }[];

    let result = {};
    const resultPromises = files.map(async (file) => {
      const res = await parseCv(file.data);
      result[file.name] = res;
    });
    await Promise.all(resultPromises);
    res.json(result);
  } catch (e) {
    res.send(e.message || "Something went wrong");
  }
});

app.listen(3000, function () {
  console.log("Working on port 3000");
});
