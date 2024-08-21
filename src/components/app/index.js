import React, { Component } from 'react'

import Card from '../card'
import Service from '../../services'
import Spiner from '../spiner'
import Error from '../error'

import './app.css'

export default class App extends Component {
  service = new Service()

  constructor(props) {
    super(props)
    this.state = {
      movies: null,
      loading: true,
      error: false,
    }
    this.loadedMovies()
    this.offline()
  }

  offline = () => {
    window.addEventListener('offline', () =>
      this.setState({ offline: true, loading: false, error: false, movies: null })
    )
    window.addEventListener('online', () => {
      this.setState({ offline: false })
      this.loadedMovies()
    })
  }

  moviesLoaded = (movies) => {
    this.setState({
      loading: false,
      movies,
    })
  }

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    })
  }

  loadedMovies() {
    this.service.getMovieStart().then(this.moviesLoaded).catch(this.onError)
  }

  render() {
    const { movies, error, loading, offline } = this.state

    const spin = loading ? <Spiner /> : null
    const err = error ? <Error message="Oops! Something went wrong." /> : null
    const element = movies ? movies.map((mov) => <Card key={mov.id} data={mov} />) : null
    const off = offline ? <Error message="Please check your internet connection and try again." /> : null

    return (
      <div className="container">
        {element}
        {spin}
        {err}
        {off}
      </div>
    )
  }
}
