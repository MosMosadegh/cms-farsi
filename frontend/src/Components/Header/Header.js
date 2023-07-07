import React from 'react'
import {AiOutlineBell} from 'react-icons/ai'
import {CiBrightnessUp} from 'react-icons/ci'

import './Header.css'

export default function Header() {
  return (
    <div className='header'>
        <div className="admin-Profile">
        <img src="/img/mos.jpg" alt="Admin Profile" />
            <div>
                <h1> مصطفی مصدق</h1>
                <h3> برنامه نوبس فرانت اند</h3>
            </div>
        </div>
        <div className="header-left-section">
            <div className="search-box">
            <input type="text" placeholder='جست و جو کنید ...' />
            <button>جست و جو</button>
            </div>
            <button className='header-left-icon'><AiOutlineBell/></button>
            <button className='header-left-icon'><CiBrightnessUp/></button>
            
        </div>

    </div>
  )
}
