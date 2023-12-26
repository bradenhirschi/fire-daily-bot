import "dotenv/config";
import { rewriteArticle } from "./openai.js";
import { getArticle, getArticleUrl } from "./news.js";
import { publishArticle } from "./supabase.js";
import { getImageUrl } from "./images.js";

const main = async () => {

  const categoryLists = [
    ["sports"], // Sports
    ["general", "science", "business", "tech", "politics"], // News
    ["entertainment"], // Entertainment
    ["health", "food", "travel"] // Lifestyle
  ]

  for (let categoryList of categoryLists) {
    const {articleText, articleCategories} = await getArticle(categoryList);
    const {title, body, imageSearchQuery} = await rewriteArticle(articleText)
    const imageUrl = await getImageUrl(imageSearchQuery);

    publishArticle(title, body, imageUrl, articleCategories);
  }  

};

main();
