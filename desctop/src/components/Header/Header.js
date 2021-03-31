import React, { useEffect } from 'react'
import Search from './Search/Search'
import styles from './Header.module.css'
import AccountName from './AccountName/AccountName'

const Header = (props) => {

  return (
    <div className={styles.header__wrapper}>
      <header className={styles.header}>
          <a  className={styles.logo} href="/">XCXLOW</a>

          <div className={styles.search__wrapper}>
            <Search />
          </div>

          { props.isAutorize
          ? <>
              <nav className={styles.navigation}>
                <ul>
                  <li><a href="/chats">Чаты</a></li>
                  <li><a href="/group">Групы</a></li>
                  <li><a href="/friend">Друзья</a></li>
                </ul>
              </nav>  
              <AccountName userData={props.userData || {}}/>
           </>
          : <a className={styles.header_autorize} href="/"><h3 >Войти/Зарегистрироваться</h3></a>
          }
      </header>

    </div>
    
  )
}

export default Header