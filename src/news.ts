// Get popular news article url from The News API
const getArticleUrl = async () => {
  const newsApiUrl = 'https://api.thenewsapi.com/v1/news/top?locale=us&limit=1';

  const response = await fetch(newsApiUrl, {
    method: "GET",
    headers: {
      authorization: `Bearer ${process.env.NEWS_API_KEY}`,
    }
  }).then(res => {
    return res.json();
  })

  const url = response.data[0].url;

  return url;
}

// Get article body from URL
export const getArticle = async () => {

  const articleUrl = await getArticleUrl();

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

  return response.data.text;
}