export const getImageUrl = async (imageSearchQuery: string) => {
  const apiUrl = `https://api.pexels.com/v1/search?query=${imageSearchQuery}&orientation=landcape&per_page=1`

  const imageUrl = await fetch(apiUrl, {
  method: "GET",
  headers: {
    authorization: process.env.PEXELS_API_KEY!,
  }
  }).then(res => {
    return res.json();
  }).then(page => {
    return page.photos[0].src.large;
  })

  return imageUrl;

}