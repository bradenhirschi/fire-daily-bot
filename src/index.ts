import "dotenv/config";
import { getArticleName } from "./asana.js";
import { generateArticle } from "./openai.js";
import { createGoogleDoc, writeContentToDoc } from "./google.js";

const main = async () => {
  // const title = await getArticleName();
  // const article = await generateArticle(title);
  // const createdDoc = await createGoogleDoc(title);
  // if (createdDoc.documentId) {
  //   await writeContentToDoc(createdDoc.documentId, createdDoc.title, article);
  // }
};

main();
