# Fire Daily Bot
This is a Node.js script which uses The News API and the OpenAI ChatGPT API to synthesize news articles for the website [firedailynews.com](FireDailyNews.com) based on currently trending articles.

When I push a commit to this repository, the project is automatically built (typescript compilation and Docker build) and deployed to the Google Artifact Registry. See [this file](.github/workflows/google-cloud.yml) for how this is done. My recurring Google Run Job will automatically update to use the new build when it writes new articles the next morning.
