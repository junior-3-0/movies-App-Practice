import React, { Component } from 'react'
import { format } from 'date-fns'

import Rates from '../rate'
import Genres from '../genre'

import notPost from './nophoto.jpg'
import './card.css'

export default class Card extends Component {
  // eslint-disable-next-line
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
    const { title, overview, poster, id, genreIds } = data
    const src = poster ? `https://image.tmdb.org/t/p/w500/${poster}` : notPost

    const genres = genreIds.map((genreId) => <Genres key={genreId} genreId={genreId} />)

    return (
      <article data-id={id} className="card">
        <div className="card-img-wrapper">
          <img className="card-img" src={src} alt="" />
        </div>
        <div className="card-description">
          <div className="card-title-wrapper">
            <h2 className="card-header">{this.shortText(title, 30)}</h2>
            <div className="card-rating">
              <span>2.5</span>
            </div>
          </div>
          <div className="card-date">{this.formatDate()}</div>
          <div className="card-genre">{genres}</div>
          <p className="card-plot">{this.shortText(overview, 155)}</p>
          <Rates />
        </div>
      </article>
    )
  }
}
