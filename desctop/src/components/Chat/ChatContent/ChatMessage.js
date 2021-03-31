import React from 'react'
import styles from '../Chat.module.css'

const ChatMessage = (props) => {
  const messageSelf = props.messageSelf ? styles.message_self : styles.message_interlocutor
  
  return (
    <div className={`${styles.message_row} ${!props.isRead && styles.message_not_read}`}>
      <div className={messageSelf}>
        <pre>{props.text || ''}</pre>
        <sub className={styles.message_time}>
          {props.time || ''}
        </sub>
        {props.error && <p className={styles.message_error}>ошибка</p>}
      </div>
    </div>
  )
}

export default ChatMessage
