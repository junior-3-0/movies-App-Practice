import React from 'react'

import { ServiceConsumer } from '../service-context'

function Genres(props) {
  const { genreId } = props
  return (
    <ServiceConsumer>
      {(genresArray) => {
        const indx = genresArray.find((item) => item.id === genreId)
        const genreName = indx.name
        return (
          <button type="button" aria-label="genre" className="button btn-genre">
            {genreName}
          </button>
        )
      }}
    </ServiceConsumer>
  )
}

export default Genres
