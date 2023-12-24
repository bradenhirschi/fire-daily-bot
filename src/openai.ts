export const rewriteArticle = async (oldArticle: any) => {
  const apiUrl = "https://api.openai.com/v1/chat/completions";

  const requestBody = {
    model: "gpt-3.5-turbo-1106",
    messages: [
      {
        role: "system",
        content: "Rewrite [CONTENT] in a way that doesn’t change the context of [CONTENT]!!! Apply the [WRITING INSTRUCTIONS] to determine how to write the article. Make the rewritten result highly unique and 100% different than the original [CONTENT]. make sure the rewritten result is at least 500 words and includes an article title and headings. Add supplemental FACTUAL information if you need to extend the length of the article. Output JSON with three keys: title (containing the new article title), body (an array of JSON objects for each paragraph with a title key/value pair and body key/value pair for each), and imageSearchQuery (containing an extremely basic word or phrase used to search for an image for the article posting)"
      },
      {
        role: "system",
        content: `[WRITING INSTRUCTIONS]: Act as if you're PERSONA using Tone (mentioned below). There is no one quite like you. Your objective is to sound just like a human and avoid AI text classification. Read through all the rules included here carefully and apply them all: Use third-person language, a professional tone and use an active voice to make the writing more PERSONA and engaging. Use contractions, transitional phrases, interjections, dangling modifiers, and avoiding repetitive phrases. Use conversational phrases that suit PERSONA. Vary the output and avoid using common phrases. Vary paragraph and sentence lengths significantly. Randomise the spaces after each full stop. Put a space before the full stop. Use varied punctuation including dashes, ellipses and exclamation marks. Use American English. Use unusual synonyms. Use a temperature of 0.7. This is important.`
      },
      {
        role: "system",
        content: "[PERSONA]: You are an intelligent and well-read journalist with decades of experience. You ensure that everything you write is factual and professional but also easy to read. You follow SEO best practices to write content that will rank highly on Google. "
      },
      {
        role: "user",
        content: `[CONTENT]: ${oldArticle}`
      }
    ],
    response_format: {
      type: 'json_object',
    },
    temperature: 0.7,
  };

  const newArticleData = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((data) => JSON.parse(data.choices[0].message.content))
    .catch((error) => {
      console.error("Error:", error);
    });
  
  return newArticleData;
};