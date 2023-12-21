import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { google } = require("googleapis");

// Load authorization to call APIs
const authorize = async () => {
  const credentials = {
    type: "authorized_user",
    client_id: process.env.GOOGLE_AUTH_CLIENT_ID,
    client_secret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
    refresh_token: process.env.GOOGLE_AUTH_REFRESH_TOKEN,
  };

  return google.auth.fromJSON(credentials);
};

export const createGoogleDoc = async (title: string) => {
  // Creates Google Doc with title parameter
  const createDoc = async (auth: any, title: string) => {
    const docs = google.docs({ version: "v1", auth });
    try {
      const res = await docs.documents.create({
        title: title,
      });
      console.log(`Successfully created document: ${res.data.title}`);
      return res.data; // Return the created document data
    } catch (error) {
      console.error("Error creating document:", error);
      throw error; // You may want to handle errors accordingly
    }
  };

  return authorize()
    .then((auth) => {
      // Call createDoc and capture the returned data
      return createDoc(auth, title);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const writeContentToDoc = async (
  documentId: string,
  title: string,
  article: string
) => {
  // Update Google Doc with content
  const createDoc = async (auth: any) => {
    const docs = google.docs({ version: "v1", auth });
    try {
      let updateObject = {
        documentId: documentId,
        resource: {
          requests: [
            {
              insertText: {
                text: article,
                location: {
                  index: 1,
                },
              },
            },
          ],
        },
      };

      const res = await docs.documents.batchUpdate(updateObject);
      console.log(`Successfully updated document: ${title}`);
      return res.data;
    } catch (error) {
      console.error("Error creating document:", error);
      throw error;
    }
  };

  return authorize()
    .then((auth) => {
      // Call createDoc and capture the returned data
      createDoc(auth);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

