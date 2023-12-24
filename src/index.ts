import "dotenv/config";
import { rewriteArticle } from "./openai.js";
import { getArticle } from "./news.js";
import { publishArticle } from "./supabase.js";
import { getImageUrl } from "./images.js";

const main = async () => {

  const oldArticle = await getArticle();
  const {title, body, imageSearchQuery} = await rewriteArticle(oldArticle)
  const imageUrl = await getImageUrl(imageSearchQuery);

  publishArticle(title, body, imageUrl);
  
};

main();
