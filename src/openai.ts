export const generateArticle = async (title: any) => {
  const apiUrl = "https://api.openai.com/v1/chat/completions";

  const requestBody = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: `Act as a journalist writing an article for a popular news website. I am going to give you an outline, and I’d like you to write a 500-word article following it. Use the following outline with one intro paragraph and five body paragraphs and the given headings. If no headings are provided, please generate five high-quality headings to give an in-depth article about the subject. Do not include a conclusion paragraph.`,
      },
      {
        role: "user",
        content: `#${title}
          50 word intro paragraph
          ## 
          90 word paragraph
          ##
          90 word paragraph
          ##
          90 word paragraph
          ## 
          90 word paragraph
          ## 
          90 word paragraph"`,
      },
    ],
    temperature: 0.7,
  };

  const article = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .then((data) => {
      return data.choices[0].message.content;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return article;
};
