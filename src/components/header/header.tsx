import './header.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { ReactComponent as IconMoon} from '../../images/icon-moon.svg';
import { ReactComponent as IconSun} from '../../images/icon-sun.svg';

function Header() {
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <header className='header'>
            <h1 className='header__headline'>ТОDO</h1>
            <div className='header__theme-swithcer' onClick={toggleTheme}>
                {theme === 'light' ?
                    (
                        <IconMoon style={{width: '30px'}}/>
                    ) : (
                        <IconSun  style={{width: '30px'}}/>
                    )
                }
            </div>
        </header>
    )
}

export default Header; 