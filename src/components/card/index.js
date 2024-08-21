import React, { Component } from 'react'
import { format } from 'date-fns'

import notPost from './nophoto.jpg'
import './card.css'

export default class Card extends Component {
  // eslint-disable-next-line
  shortText(text) {
    const length = 200
    if (text.length < length) {
      return text
    }
    const indx = text.indexOf(' ', 189)
    const newText = `${text.slice(0, indx)}...`
    return newText
  }

  formatDate() {
    const { data } = this.props
    const { release_date: date } = data
    if (!date) {
      return date
    }
    return format(new Date(date), 'PP')
  }

  render() {
    const { data } = this.props
    const { title, overview, poster, id } = data
    const src = poster ? `https://image.tmdb.org/t/p/w500/${poster}` : notPost

    return (
      <article data-id={id} className="card">
        <div className="card-img-wrapper">
          <img className="card-img" src={src} alt="" />
        </div>
        <div className="card-description">
          <h2 className="card-header">{title}</h2>
          <div className="card-date">{this.formatDate()}</div>
          <div className="card-genre">
            <button type="button" className="button">
              Action
            </button>
            <button type="button" className="button">
              Drama
            </button>
          </div>
          <p className="card-plot">{this.shortText(overview)}</p>
        </div>
      </article>
    )
  }
}
