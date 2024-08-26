import React, { Component } from 'react'
import { Rate, ConfigProvider } from 'antd'

export default class Rates extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rate: 0,
    }
  }

  rate = (value) => {
    const { rateTheMovie } = this.props
    this.setState({
      rate: value,
    })
    rateTheMovie(value)
  }

  render() {
    const { rate } = this.state
    return (
      <ConfigProvider
        theme={{
          token: {
            marginXS: 3,
          },
        }}
      >
        <Rate allowHalf defaultValue={rate} count={10} onChange={this.rate} />
      </ConfigProvider>
    )
  }
}
