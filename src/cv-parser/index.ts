import { CVParser } from "./cvparser";
import { ContactsProcessor } from "./cvprocessors/contacts.processor";
import cvkeywords from "../jsondef/cvkeywords";

export async function parseCv(buffer: Buffer) {
  const parser = new CVParser(cvkeywords);
  parser.dataProcessors.push(new ContactsProcessor());

  return await parser.parse(buffer);
}
