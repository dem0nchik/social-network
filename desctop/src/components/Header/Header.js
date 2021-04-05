import React, { useEffect, useState } from 'react'
import Search from './Search/Search'
import styles from './Header.module.css'
import AccountName from './AccountName/AccountName'
import { connect } from 'react-redux'
import { getCountUnreadChatsAction } from '../../actions/chatAction'

const Header = (props) => {
  const [showUnread, setShowUnread] = useState(false);
  useEffect(() => {
    props.isAutorize && props.getCountUnreadChatsAction()
  }, [])

  useEffect(() => {
    setShowUnread(props.chat.countUnreadChats.length && +props.chat.countUnreadChats.length !== 0 ? true : false)
  }, [props.chat.countUnreadChats])
  
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
                  <li>
                    <a className={styles.header_chat_link} href="/chats">
                      <span>Чаты</span>
                      {showUnread && 
                        <span className={styles.header_chat_link_count}>{props.chat.countUnreadChats.length}</span>
                      }
                    </a>
                  </li>
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

const mapDispatchToProps = dispatch => ({
  getCountUnreadChatsAction: () => dispatch(getCountUnreadChatsAction()),
})
export default connect(store => ({chat: store.chat}), mapDispatchToProps)(Header)