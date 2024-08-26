import React from 'react'
import { Alert, ConfigProvider } from 'antd'

import './error.css'

function Error(props) {
  const { message } = props
  return (
    <ConfigProvider
      theme={{
        token: {
          /* here is your global tokens */
          colorError: '#e47ad5',
          colorText: '#e47ad5',
          fontSize: 24,
        },
      }}
    >
      <div className="overlay">
        <Alert message="Error" description={message} type="error" showIcon />
      </div>
    </ConfigProvider>
  )
}

export default Error
