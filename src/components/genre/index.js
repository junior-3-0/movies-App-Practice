import React, { Component } from 'react'

import { ServiceConsumer } from '../service-context'

export default class Genres extends Component {
  constructor(props) {
    super(props)
    this.state = {
      genreName: null,
    }
  }

  getGenre = (arr) => {
    const { genreId } = this.props
    const indx = arr.find((item) => item.id === genreId)
    this.setState({ genreName: indx.name })
  }

  render() {
    const { genreName } = this.state
    return (
      <ServiceConsumer>
        {(service) => {
          service.getGenres().then((res) => this.getGenre(res))
          return (
            <button type="button" aria-label="genre" className="button btn-genre">
              {genreName}
            </button>
          )
        }}
      </ServiceConsumer>
    )
  }
}
