import React, {useEffect, useState} from 'react'
import styles from '../Chat.module.css'
import utilits from '../../../utilits/utilits'

const ChatHeader = (props) => {
  const typesStatus = {
    offline: 'offline',
    lastOnline: 'lastOnline',
    typing: 'typing',
    online: 'online'
  }
  const [status, setStatus] = useState({
    status: 'offline', 
    type: typesStatus.offline
  })

  const imageProfile = props.profileImg ? props.profileImg : "/public/img/user_icon.jpg"
  const LinkProfile = props.linkToProfile || '/chats'


  useEffect(() => {
    props.socket.on('USER:TYPING', data => {
      if (data.isTyping) {
        setStatus({
          status: 'Печатает...', 
          type: typesStatus.typing
        })
      } else {
        props.online && setStatus({
          status: 'online', 
          type: typesStatus.online
        })
      }
    })

    if (props.lastDateOnline && props.online === false) {
      const date = utilits.parseDate(new Date(props.lastDateOnline), true)
      setStatus({
        status: `${date.timeNow}, ${date.dateNow}`, 
        type: typesStatus.lastOnline
      })
    } else {
      props.online && setStatus({
        status: 'online', 
        type: typesStatus.online
      })
    }

    return () => {
      setStatus({status: 'offline', 
      type: typesStatus.offline})
    };
    
  }, [])


  const returnStatus = () => {
    switch(status.type) {
      case typesStatus.offline:
        return <sub className={`${styles.chat_status} ${styles.chat_status_offline}`}>
            {status.status}
        </sub>
      case typesStatus.online:
        return <sub className={styles.chat_status}>
            {status.status}
        </sub>
      case typesStatus.typing:
        return <sub className={styles.chat_last_seen}>
            {status.status}
            <div className={styles.chat_typing_animation}><div></div><div></div><div></div><div></div></div>
        </sub>
      case typesStatus.lastOnline:
        return <sub className={styles.chat_last_seen}>
            {status.status}
        </sub>
      default:
        break;
    }
    return null
  }


  return (
    <div className={styles.chat_header}>

    <a href={LinkProfile}>
      <img src={imageProfile} alt="profile"/>
    </a>

    <div className={styles.chat_description}>
      <a href={LinkProfile}>
        <p className={styles.chat_name}>{props.name || ''}</p>
      </a>

      { returnStatus() }

    </div>
    <a href="/chats" className={styles.buttons_wrap}>
      <svg className={styles.button_back} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 443.52 443.52"><g><g><path d="M143.492,221.863L336.226,29.129c6.663-6.664,6.663-17.468,0-24.132c-6.665-6.662-17.468-6.662-24.132,0l-204.8,204.8    c-6.662,6.664-6.662,17.468,0,24.132l204.8,204.8c6.78,6.548,17.584,6.36,24.132-0.42c6.387-6.614,6.387-17.099,0-23.712    L143.492,221.863z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
    </a>
  </div>
  )
}

export default ChatHeader


