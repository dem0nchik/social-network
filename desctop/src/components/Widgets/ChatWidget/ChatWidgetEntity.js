import React from 'react'
import styles from './ChatWidget.module.css'

const ChatWidgetEntity = (props) => {
  const showUnread = props.unread && +props.unread !== 0 ? true : false
  const imageEntity = props.profileImg || "/public/img/user_icon.jpg"
  const link = props.chatId ? `/chat${props.chatId}` : ''

  return (
    <div className={styles.entity_chat}>
      <a href={link}>
        <div>
          <img src={imageEntity} alt=""/>
          {props.isOnline && <span className={styles.online_icon}></span>}
        </div>
        <p className={styles.entity__name}>{props.name || ''}</p>
        {showUnread && 
            <span className={styles.count}>{props.unread}</span>
        }
      </a>
    </div>
  )
}

export default ChatWidgetEntity
