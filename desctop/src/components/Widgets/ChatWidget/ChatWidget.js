import React from 'react'
import styles from './ChatWidget.module.css'

const ChatWidget = (props) => {

  return (
    <div className={styles.chat}>
      <a className={styles.chat__title} href="/chat"><h3 >Чаты</h3></a>

      <div className={styles.entity__wrap}>
        <p className={styles.entity_nothing}>Нет ни одного чата</p>
      </div>
    </div>
  )
}

export default ChatWidget