import React from 'react'

interface Props {
  title: string
  onBack?: () => void
  showBack?: boolean
}

const Header: React.FC<Props> = ({ title, onBack, showBack = true }) => {
  return (
    <header className='app-header'>
      <div className='header-inner'>
        {showBack ? (
          <button className='back-btn' onClick={onBack}>&larr;</button>
        ) : <div />}
        <div className='header-title'>{title}</div>
        <div style={{width: 40}} />
      </div>
    </header>
  )
}

export default Header