export default class Service {
  apiBase = 'https://api.themoviedb.org/3/'
  // 'https://api.themoviedb.org/3/search/movie?query=return&include_adult=false&language=en-US&page=1&api_key=7cbe70db57414f8acb8748b282af2cdb'
  // 'https://api.themoviedb.org/3/discover/movie?api_key=7cbe70db57414f8acb8748b282af2cdb'
  // 'search/movie?query=return&include_adult=false&language=en-US&page=1'

  async getResource(url) {
    const response = await fetch(`${this.apiBase}${url}`)
    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`)
    }
    const data = await response.json()
    return data
  }

  async getMovieStart() {
    const res = await this.getResource('discover/movie?api_key=7cbe70db57414f8acb8748b282af2cdb')
    const { results } = res
    return results.map((item) => this.transformMovie(item))
  }

  // eslint-disable-next-line
  transformMovie(movie) {
    return {
      title: movie.title,
      overview: movie.overview,
      poster: movie.poster_path,
      id: movie.id,
    }
  }
}
