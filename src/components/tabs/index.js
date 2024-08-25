import React from 'react'
import { Tabs, ConfigProvider } from 'antd'

import Search from '../search'

import './tabs.css'

function Tab(props) {
  const { search } = props

  const onChange = (key) => {
    const { moviesList, loadedMovies } = props
    if (key === '2') {
      moviesList()
    } else {
      loadedMovies()
    }
  }

  const items = [
    {
      key: '1',
      label: 'Search',
      children: <Search search={search} />,
    },
    {
      key: '2',
      label: 'Rated',
    },
  ]

  return (
    <ConfigProvider
      theme={{
        components: {
          Tabs: {
            inkBarColor: '#6c38cc',
            itemActiveColor: '#6c38cc',
            itemColor: '#fafafa',
            itemHoverColor: '#afb2bf',
            itemSelectedColor: '#6c38cc',
            titleFontSizeLG: 22,
          },
        },
        token: {
          lineWidth: 2,
          lineHeight: 2,
          margin: 35,
        },
      }}
    >
      <Tabs size="large" centered="true" defaultActiveKey="1" items={items} onChange={onChange} />
    </ConfigProvider>
  )
}

export default Tab
