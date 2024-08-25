export default class Service {
  apiBase = 'https://api.themoviedb.org/3/'

  bearer =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Y2JlNzBkYjU3NDE0ZjhhY2I4NzQ4YjI4MmFmMmNkYiIsIm5iZiI6MTcyNDYwNjQyMy43ODk1NTQsInN1YiI6IjY2YzQ4N2JjMzYwYTI0ZmVkZmQ3MjgyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IUcNfivF0-9r257rRh38pZpq2dE987qfBsYRvu_xXL0'

  apiKey = '7cbe70db57414f8acb8748b282af2cdb'

  constructor() {
    this.guestSession()
  }
  // 'https://api.themoviedb.org/3/search/movie?query=return&include_adult=false&language=en-US&page=1&api_key=7cbe70db57414f8acb8748b282af2cdb'
  // 'https://api.themoviedb.org/3/discover/movie?api_key=7cbe70db57414f8acb8748b282af2cdb'
  // 'search/movie?query=return&include_adult=false&language=en-US&page=1'

  async getResource(url, options = null) {
    const response = await fetch(`${this.apiBase}${url}`, options)
    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`)
    }
    const data = await response.json()

    return data
  }

  // eslint-disable-next-line class-methods-use-this
  getGenres = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${this.bearer}`,
      },
    }

    const res = await this.getResource('genre/movie/list?language=en', options)
    const { genres } = res

    return genres
  }

  // eslint-disable-next-line class-methods-use-this
  async getRating() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${this.bearer}`,
      },
    }
    console.log(this.sessionId)

    const res = await this.getResource(
      `guest_session/${this.sessionId}/rated/movies?language=en-US&page=1&sort_by=created_at.asc`,
      options
    )

    const { results, total_pages: pages } = res

    return { movies: results.map((item) => this.transformMovie(item)), pages }
  }

  // eslint-disable-next-line class-methods-use-this
  async setRating(sessionId) {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${this.bearer}`,
      },
      body: '{"value":8.5}',
    }

    const res = await this.getResource(`movie/533535/rating?guest_session_id=${sessionId}`, options)
    console.log('done ', res)
    return res
  }

  // eslint-disable-next-line class-methods-use-this
  async guestSession() {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${this.bearer}`,
      },
    }

    const res = await this.getResource('authentication/guest_session/new', options)
    const { guest_session_id: sessionId } = res
    this.sessionId = sessionId
    console.log(this.sessionId)
    this.setRating(this.sessionId)

    return sessionId
  }

  async getMovies(currentTitle, currentPage) {
    let title = `query=${currentTitle}&`
    let type = 'search/'
    let page = `&page=${currentPage}`
    if (!currentPage) {
      page = '&page=1'
    }
    if (!currentTitle) {
      title = ''
      type = 'discover/'
    }

    const res = await this.getResource(
      `${type}movie?${title}include_adult=false&language=en-US${page}&api_key=${this.apiKey}`
    )
    const { results, total_pages: pages } = res

    return { movies: results.map((item) => this.transformMovie(item)), pages }
  }

  // eslint-disable-next-line
  transformMovie(movie) {
    return {
      title: movie.title,
      overview: movie.overview,
      poster: movie.poster_path,
      id: movie.id,
      date: movie.release_date,
      genreIds: movie.genre_ids,
    }
  }
}
