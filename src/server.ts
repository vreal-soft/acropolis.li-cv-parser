import * as express from "express";
import * as fileupload from "express-fileupload";
import { parseCv } from "./cv-parser";

const app = express();

app.use(fileupload());

const invalidCV = {
  isInvalid: true,
  name: "No Name",
  sections: {
    skills: [],
    education: [],
    experience: [],
    profile: ["Location unknown", "Working unknown", "Location unknown"],
  },
};

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
      try {
        const res = await parseCv(file.data);
        result[file.name] = res;
      } catch (e) {
        result[file.name] = Object.assign({}, invalidCV);
      }
    });
    await Promise.all(resultPromises);

    Object.keys(result).forEach((key) => {
      const cv = result[key];
      if (!cv.name) result[key] = Object.assign({}, invalidCV);
    });

    res.json(result);
  } catch (e) {
    res.send(e.message || "Something went wrong");
  }
});

app.listen(3000, function () {
  console.log("Working on port 3000");
});
