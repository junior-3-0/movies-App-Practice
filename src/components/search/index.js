import { Input, ConfigProvider } from 'antd'
import React, { Component } from 'react'

import './search.css'

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = { inputValue: '' }
  }

  componentDidUpdate(_, prevState) {
    const { inputValue } = this.state
    const { search } = this.props
    if (prevState.inputValue !== inputValue) {
      if (!inputValue) {
        search()
      }
    }
  }

  onChange = (event) => {
    const { value } = event.target
    const { search } = this.props

    this.setState({
      inputValue: value,
    })

    if (!value) {
      return
    }

    search(value)
  }

  render() {
    const { inputValue } = this.state

    return (
      <ConfigProvider
        theme={{
          components: {
            Input: {
              activeBg: '#2e2d3d',
              activeBorderColor: '#6c38cc',
              inputFontSizeLG: 16,
            },
          },
        }}
      >
        <Input value={inputValue} placeholder="Type to search..." size="large" onChange={this.onChange} />
      </ConfigProvider>
    )
  }
}

export default Search
