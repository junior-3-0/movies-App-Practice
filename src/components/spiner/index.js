import React from 'react'
import { Spin, ConfigProvider } from 'antd'

function Spiner() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Spin: {
            colorPrimary: '#e47ad5',
            dotSizeLG: 70,
          },
        },
      }}
    >
      <Spin tip="Loading" size="large" fullscreen />
    </ConfigProvider>
  )
}
export default Spiner
