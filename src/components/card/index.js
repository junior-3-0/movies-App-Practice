import React, { Component } from 'react'
import { format } from 'date-fns'
import PropTypes from 'prop-types'

import Rates from '../rate'
import Genres from '../genre'

import notPost from './nophoto.jpg'

import './card.css'

export default class Card extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rate: null,
    }
  }

  rateTheMovie = (id, value) => {
    const { setRating } = this.props
    this.setState({
      rate: value,
    })
    setRating(id, value)
  }

  // eslint-disable-next-line class-methods-use-this
  shortText(text, num) {
    const length = 30
    if (text.length < length) {
      return text
    }
    const indx = text.indexOf(' ', num)
    const newText = `${text.slice(0, indx)}...`
    return newText
  }

  formatDate() {
    const { data } = this.props
    const { date } = data
    if (!date) {
      return date
    }
    return format(new Date(date), 'PP')
  }

  render() {
    const { data } = this.props
    const { rate } = this.state
    const { title, overview, poster, id, genreIds } = data
    const src = poster ? `https://image.tmdb.org/t/p/w500/${poster}` : notPost
    let className = ''

    const genres = genreIds.map((genreId) => <Genres key={genreId} genreId={genreId} />)

    className = rate > 0 ? 'card-rating-03' : className
    className = rate >= 3 ? 'card-rating-35' : className
    className = rate >= 5 ? 'card-rating-57' : className
    className = rate >= 7 ? 'card-rating-7' : className

    return (
      <article data-id={id} className="card">
        <div className="card-img-wrapper">
          <img className="card-img" src={src} alt="" />
        </div>
        <div className="card-description">
          <div className="card-title-wrapper">
            <h2 className="card-header">{this.shortText(title, 30)}</h2>
            <div className={`card-rating ${className}`}>
              <span>{rate}</span>
            </div>
          </div>
          <div className="card-date">{this.formatDate()}</div>
          <div className="card-genre">{genres}</div>
          <p className="card-plot">{this.shortText(overview, 135)}</p>
          <Rates rateTheMovie={(value) => this.rateTheMovie(id, value)} />
        </div>
      </article>
    )
  }
}

Card.defaultProps = {
  data: {
    title: 'Title',
    overview: 'Lorem is lorem Lorem is lorem Lorem is lorem.',
    poster: null,
    id: (Math.random() * 1000).toFixed(0),
    genreIds: [27],
  },
}

Card.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    overview: PropTypes.string,
    poster: PropTypes.string,
    id: PropTypes.number,
    genreIds: PropTypes.arrayOf(PropTypes.number),
  }),
}
