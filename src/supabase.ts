import { createClient } from '@supabase/supabase-js'
import { NUM_AUTHORS } from './constants/authors.js'

export const publishArticle = async (title: string, body: string, imageUrl: string, categoryList: string[]) => {

  const slug = title.toLowerCase()
        .replace(/\s+/g, '-')        // Replace spaces with dashes
        .replace(/[^\w\-]+/g, '')    // Remove non-word characters (except '-')
        .replace(/\-\-+/g, '-')      // Replace consecutive dashes with a single dash
        .replace(/^-+|-+$/g, '');    // Remove leading and trailing dashes

  const author_id = Math.floor(Math.random() * NUM_AUTHORS) + 1;

  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_API_KEY!);

  const {data, error} = await supabase.from('story').insert({title, body, slug, author_id, image_url: imageUrl, categories: categoryList});

  if (error) {
    console.error(error);
  } else {
    return data;
  }
  
}