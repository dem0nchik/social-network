import React from 'react'
import styles from './ChatList.module.css'
import utilits from '../../../utilits/utilits'

const ChatListEntity = (props) => {
  const imageEntity = props.profileImg || "/public/img/user_icon.jpg"
  const link = props.chatId ? `/chat${props.chatId}` : "/chats"
  const showUnread = props.unread && +props.unread !== 0 ? true : false
  const date = props.message ? utilits.parseDate(new Date(props.time), true).timeNow : ''
  const isRead = !props.isRead ? styles.message_unread : ''

  return (
    <a href={link}>
      <div className={styles.entity}>
        <div>
          <img className={styles.entity_img} src={imageEntity} alt="profile"/>
          {props.isOnline && <span className={styles.online_icon}></span>}
        </div>
        <div className={styles.desciption}>
          <p className={styles.name}>{props.name || ''}</p>
          <p className={`${styles.message} ${props.isRead !== null && isRead}`}>{props.message || ''}</p>
        </div>
        <div className={styles.info}>
          <span className={styles.time}>{date}</span>
          {
            showUnread && 
            <span className={styles.count}>{props.unread}</span>
          }
        </div>
      </div>
    </a>
  )
}

export default ChatListEntity