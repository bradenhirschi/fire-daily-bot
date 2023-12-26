// Get popular news article url from The News API
export const getArticleUrl = async (categoryList: string[]) => {

  const formattedCategoryList = encodeURIComponent(categoryList.join(','));
  const newsApiUrl = `https://api.thenewsapi.com/v1/news/top?locale=us&categories=${formattedCategoryList}&limit=1`;

  const response = await fetch(newsApiUrl, {
    method: "GET",
    headers: {
      authorization: `Bearer ${process.env.NEWS_API_KEY}`,
    }
  }).then(res => {
    return res.json();
  })

  const articleUrl = response.data[0].url;
  const articleCategories = response.data[0].categories;

  return {articleUrl, articleCategories};
}

// Get article body from URL
export const getArticle = async (categoryList: string[]) => {

  const {articleUrl, articleCategories} = await getArticleUrl(categoryList);

  const apiUrl = `https://api.articlextractor.com/v1/extract?url=${articleUrl}&language=en`

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      authorization: `Bearer ${process.env.ARTICLE_EXTRACTOR_API_KEY}`,
    }
  }).then(res => {
    if (!res.ok) {
      console.error('Error extracting original article from URL')
    }
    return res.json();
  })

  return { articleText: response.data.text, articleCategories };
}