const API_URL = 'https://openlibrary.org'

export const getBooks = async (query = 'fiction', limit = 20) => {
  try {
    const response = await fetch(
      `${API_URL}/search.json?q=${encodeURIComponent(query)}&limit=${limit}&fields=key,title,author_name,cover_i,first_publish_year`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch books')
    }

    const data = await response.json()
    return data.docs
      .filter(book => book.cover_i)
      .map(book => ({
        key: book.key,
        title: book.title || 'Unknown Title',
        author: book.author_name?.[0] || 'Unknown Author',
        year: book.first_publish_year || 'Unknown Year',
        cover: `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
      }))
  } catch (error) {
    console.error('Error fetching books:', error)
    throw error
  }
}
export const getBookDetails = async (bookKey) => {
  try {
    const response = await fetch(`${API_URL}${bookKey}.json`)

    if (!response.ok) {
      throw new Error('Failed to fetch book details')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching book details:', error)
    throw error
  }
}

export const searchBooks = async (query) => {
  return await getBooks(query, 20)
}
