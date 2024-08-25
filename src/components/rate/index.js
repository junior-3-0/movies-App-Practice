import React from 'react'
import { Rate, ConfigProvider } from 'antd'

function Rates() {
  return (
    <ConfigProvider
      theme={{
        token: {
          marginXS: 3,
        },
      }}
    >
      <Rate allowHalf defaultValue={0} count={10} />
    </ConfigProvider>
  )
}

export default Rates
