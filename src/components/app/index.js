import React, { Component } from 'react'
import debounce from 'lodash.debounce'

import Card from '../card'
import Service from '../../services'
import Spiner from '../spiner'
import Error from '../error'
import Search from '../search'
import NotMovies from '../not-movies'
import PaginationPanel from '../pagination'

import './app.css'

export default class App extends Component {
  service = new Service()

  constructor(props) {
    super(props)
    this.state = {
      movies: [],
      loading: true,
      error: false,
      page: 1,
      title: '',
    }
  }

  componentDidMount() {
    const { page, title } = this.state

    this.loadedMovies(title, page)
    window.addEventListener('offline', () =>
      this.setState({ offline: true, loading: false, error: false, movies: null })
    )
    window.addEventListener('online', () => {
      this.setState({ offline: false })
      this.loadedMovies(title, page)
    })
  }

  componentDidUpdate(_, prevState) {
    const { page, title } = this.state
    if (prevState.page !== page || prevState.title !== title) {
      this.loadedMovies(title, page)
    }
  }

  onChangePage = (currentPage) => {
    if (!currentPage) {
      return
    }
    this.setState({
      page: currentPage,
      loading: true,
    })
  }

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    })
  }

  onSearch = debounce((title) => {
    this.setState({
      loading: true,
      title,
      page: 1,
    })

    this.service
      .getMovies(title)
      .then((movies) => {
        this.moviesLoaded(movies)
      })
      .catch(this.onError)
  }, 1500)

  moviesLoaded = (results) => {
    this.setState({
      loading: false,
      movies: results.movies,
      pages: results.pages,
    })
  }

  loadedMovies = (title, currentPage) => {
    this.service
      .getMovies(title, currentPage)
      .then((results) => this.moviesLoaded(results, currentPage))
      .catch(this.onError)
  }

  // eslint-disable-next-line
  renderCard(arr) {
    return arr.map((mov) => <Card key={mov.id} data={mov} />)
  }

  render() {
    const { movies, error, loading, offline, page, pages } = this.state

    const spin = loading ? <Spiner /> : null
    const err = error ? <Error message="Oops! Something went wrong." /> : null
    const element = movies ? this.renderCard(movies) : null
    const off = offline ? <Error message="Please check your internet connection and try again." /> : null
    const notMovies = movies.length ? null : <NotMovies />

    return (
      <div className="container">
        <Search search={this.onSearch} />
        {element}
        {spin}
        {err}
        {off}
        {notMovies}
        <PaginationPanel pages={pages} onChangePage={this.onChangePage} defaultCurrent={page} />
      </div>
    )
  }
}
