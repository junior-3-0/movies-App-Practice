export default class Service {
  constructor() {
    this.guestSession()
  }

  apiBase = 'https://api.themoviedb.org/3/'

  bearer =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Y2JlNzBkYjU3NDE0ZjhhY2I4NzQ4YjI4MmFmMmNkYiIsIm5iZiI6MTcyNDY3MDIxMS42NjgzNzIsInN1YiI6IjY2YzQ4N2JjMzYwYTI0ZmVkZmQ3MjgyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EqH1Y_Gy79zOe3CT4i90-AWi_nybN1sBLk1R0tr9TEs'

  apiKey = '7cbe70db57414f8acb8748b282af2cdb'

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

    return sessionId
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
  async getRating(currentPage) {
    let page = `${currentPage}`
    if (!currentPage) {
      page = '1'
    }
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${this.bearer}`,
      },
    }

    const res = await this.getResource(
      `guest_session/${this.sessionId}/rated/movies?language=en-US&page=${page}&sort_by=created_at.asc`,
      options
    )

    const { results, total_pages: pages } = res

    return { movies: results.map((item) => this.transformMovie(item)), pages }
  }

  setRating = async (id, value) => {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Bearer ${this.bearer}`,
      },
      body: `{"value":${value}}`,
    }

    const res = await this.getResource(`movie/${id}/rating?guest_session_id=${this.sessionId}`, options)

    return res
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
