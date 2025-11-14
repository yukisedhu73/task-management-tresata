import React from 'react'
import BackButton from "../assets/backBtn.svg"

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
          <button className='back-btn' onClick={onBack}><img src={BackButton} width={20} height={20} style={{marginTop: 6}} alt="Back Button" /></button>
        ) : <div />}
        <div className='header-title'>{title}</div>
        <div style={{width: 40}} />
      </div>
    </header>
  )
}

export default Header