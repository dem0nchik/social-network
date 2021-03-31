import React, {useEffect} from 'react'
import styles from './ChatList.module.css'
import ChatListEntity from './ChatListEntity'

const ChatList = (props) => {
  const renderTemplateChatList = () => {
    let template = null 

    if (props.data.length) {
      template = props.data.map((el, i) => {
        return <ChatListEntity 
          key={i}
          name={el.name}
          profileImg={el.profileImg}
          isOnline={el.isOnline}
          chatId={el.chatId}
          unread={el.countUnread}
          isRead={el.lastMessageIsRead}
          message={el.lastMessageText}
          time={el.lastMessageDate}
        />
      })
    }

    return template
  }

  return (
    <div className={styles.list}>
      <div className={styles.title}>
        <h1><a href="/chats">Чаты</a></h1>
      </div>

      <div className={styles.entity_wrap}>
        { props.data.length 
          ? renderTemplateChatList()
          : <p className={styles.no_list}>В данный вы чатов еще не создали...</p>
        }
      </div>
    </div>
  )
}

export default ChatList
