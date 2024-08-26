import React from 'react'
import { Pagination, ConfigProvider } from 'antd'
import PropTypes from 'prop-types'

import './pagination.css'

function PaginationPanel(props) {
  const { onChangePage, defaultCurrent, pages } = props

  return (
    <ConfigProvider
      theme={{
        components: {
          Pagination: {
            itemBg: '#2e2d3d',
            itemActiveBg: '#6c38cc',
          },
        },
        token: {
          colorText: '#fafafa',
          colorPrimary: 'none',
        },
      }}
    >
      <Pagination
        showSizeChanger={false}
        defaultCurrent={1}
        current={defaultCurrent}
        total={pages}
        pageSize={1}
        onChange={(event) => onChangePage(event)}
      />
    </ConfigProvider>
  )
}

export default PaginationPanel

PaginationPanel.prototype.defaultProps = {
  pages: 1,
  defaultCurrent: 1,
}

PaginationPanel.prototype.propTypes = {
  pages: PropTypes.number,
  defaultCurrent: PropTypes.number,
}
