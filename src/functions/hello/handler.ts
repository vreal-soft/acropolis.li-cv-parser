import "source-map-support/register";

import { middyfy } from "@libs/lambda";
import * as parser from "lambda-multipart-parser";
import { parseCv } from "../../cv-parser";

const hello = async (event) => {
  try {
    const { files } = await parser.parse(event);
    console.log("files", files[0]);

    let result = {};
    const resultPromises = files.map(async (file) => {
      const res = await parseCv(file.content);
      result[file.filename] = res;
    });
    await Promise.all(resultPromises);
    return {
      statusCode: 200,
      body: JSON.stringify(result, null, 2),
    };
  } catch (e) {
    console.error("error", e);
    return { statusCode: 500, body: e.message || e };
  }
};

export const main = middyfy(hello);
