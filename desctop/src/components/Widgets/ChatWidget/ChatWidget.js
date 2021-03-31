import React, { useEffect } from 'react'
import styles from './ChatWidget.module.css'
import ChatWidgetEntity from './ChatWidgetEntity'
import socket from '../../../socketio/socketio'

const ChatWidget = (props) => {
  useEffect(() => {
    props.getChatWidgetListAction()

    socket.on('INTERLOCUTOR:NEW_MESSAGE', (data) => {
      props.newMessageInterlocutorFromSocketToWidgetAction(data)
    })

    return () => {
      socket.off('INTERLOCUTOR:NEW_MESSAGE')
    }
  }, [])
  
  const renderTemplateChatWidgetList = () => {
    let template = null 

    if (props.data.length) {
      template = props.data.map((el, i) => {
        return <ChatWidgetEntity 
          key={i}
          name={el.name}
          profileImg={el.profileImg}
          unread={el.countUnread}
          isOnline={el.isOnline}
          chatId={el.chatId}
        />
      })
    }

    return template
  }
  return (
    <div className={styles.chat}>
      <a className={styles.chat__title} href="/chats"><h3 >Чаты</h3></a>

      <div className={styles.entity__wrap}>
        { props.data?.length 
          ? renderTemplateChatWidgetList()
          : <p className={styles.entity_nothing}>Нет ни одного чата</p>
        }
      </div>
    </div>
  )
}

export default ChatWidget