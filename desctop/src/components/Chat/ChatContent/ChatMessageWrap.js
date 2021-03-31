import React from 'react'
import ChatMessage from './ChatMessage'
import utilits from '../../../utilits/utilits'
import styles from '../Chat.module.css'

export default function ChatMessageWrap(props) {
  const renderTemplateMessages = () => {
    let template = null
    
    if (props.data) {
      template = props.data.map((el, i) => {
        const datetitle = utilits.parseDate(new Date(el.date), true)
  
        return (
          <div key={i} className={styles.message_wrap_entity}> 
            <p className={styles.message_wrap_title}>{datetitle.dateNow}</p>
            { el.messages.map((message, i) => {
                const dateMessage = utilits.parseDate(new Date(message.time), true)
                return <ChatMessage 
                  key={i}
                  messageSelf={message.messageSelf}
                  time={dateMessage.timeNow}
                  text={message.bodyText}
                  isRead={message.isRead}
                  error={message.error}
                />
              })
            } 
          </div>
        )
      })
    }

    return template
  }
  return (
    <div>
      {renderTemplateMessages()}
    </div>
  )
}
