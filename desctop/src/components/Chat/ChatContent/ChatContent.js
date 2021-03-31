import React, {useState, useEffect, useRef} from 'react'
import CastomInput from '../../accessoryComponents/CastomInput/CastomInput'
import styles from '../Chat.module.css'
import ChatHeader from './ChatHeader'
import Skeleton from 'react-loading-skeleton';
import useTyping from '../../../hooks/useTyping'

import ChatMessageWrap from './ChatMessageWrap'

const ChatContent = (props) => {
  const messagesRef = useRef(null)
  const {handleTyping, timeoutTypingRef, setTyping} = useTyping(false)
  const [inputMsg, setInputMsg] = useState('')


  useEffect(() => {
    if(props.data?.name) {
      document.title = `Чат ${props.data.name} | xcxlow`
    } else {
      document.title = `Чат | xcxlow`
    }

    const pathName = props.location.pathname
    const chatId = pathName.slice(5)

    if(Number.isInteger(+chatId) 
      && pathName.slice(0, 5) === '/chat'
      && chatId !== '') 
    {
      if (props.data.fetchToDataChat) {
        props.getInfoOfChatAction(chatId)
      }
    } else {
      window.location.href = '/chats'
    }
  }, [])

  useEffect(() => {
    const {succesConnect, chatId} = props.data 
    if (succesConnect) {
      props.socket.emit('CHAT:JOIN', chatId)
    }
  }, [props.data.succesConnect])



  const handleInput = (e) => {
    const {socket, data} = props
    setTyping(socket, handleTyping, timeoutTypingRef, data.chatId)
    setInputMsg(e.currentTarget.value)
  }

  useEffect(() => {
    if(props.data.messageList) {
      messagesRef.current.scrollTo(0, 99999)
    }
    return () => messagesRef.current = null
  }, [props.data.messageList])

  
  const handleSend = () => {
    if (inputMsg.trim()) {
      const interlocutorId = props.data.linkToProfile.substr(3)

      const dataToSocket = {
        inputMsg,
        chatId: props.data.chatId,
        interlocutorId,
        name: `${props.userData.name} ${props.userData.surname}`,
        profileImg: props.userData.profile_img,
        message: inputMsg
      }

      props.sendMessageAction(dataToSocket, props.socket)
      setInputMsg('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      return
    } else if (e.key === 'Enter') {
      e.preventDefault()
      handleSend()
    }
  }
  
  return (
    <>
      <ChatHeader
        socket={props.socket}
        online={props.data.isOnline} 
        name={props.data.name}
        profileImg={props.data.profileImg}
        linkToProfile={props.data.linkToProfile}
        lastDateOnline={props.data.lastDateOnline}
      />

      <div className={styles.message__wrap} ref={messagesRef}>
        {
          props.data.fetchToDataChat
          ? <Skeleton height={'100vh'}/>
          : <ChatMessageWrap 
              data={props.data.messageList}
            />
        }
              
      </div>

      <div className={styles.type__message}>
        <div className={styles.message_icons_photo} title="Добавить фотографию" >
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -21 511.98744 511"><path d="m133.320312 373.828125c-34.152343 0-64.53125-21.867187-75.5625-54.421875l-.746093-2.453125c-2.601563-8.621094-3.691407-15.871094-3.691407-23.125v-145.453125l-51.753906 172.757812c-6.65625 25.410157 8.511719 51.753907 33.960938 58.773438l329.878906 88.34375c4.117188 1.066406 8.234375 1.578125 12.289062 1.578125 21.246094 0 40.660157-14.101563 46.101563-34.882813l19.21875-61.117187zm0 0"/><path d="m191.988281 149.828125c23.53125 0 42.664063-19.136719 42.664063-42.667969s-19.132813-42.667968-42.664063-42.667968-42.667969 19.136718-42.667969 42.667968 19.136719 42.667969 42.667969 42.667969zm0 0"/><path d="m458.652344.492188h-320c-29.394532 0-53.332032 23.9375-53.332032 53.335937v234.664063c0 29.398437 23.9375 53.335937 53.332032 53.335937h320c29.398437 0 53.335937-23.9375 53.335937-53.335937v-234.664063c0-29.398437-23.9375-53.335937-53.335937-53.335937zm-320 42.667968h320c5.890625 0 10.667968 4.777344 10.667968 10.667969v151.445313l-67.390624-78.636719c-7.148438-8.382813-17.496094-12.863281-28.609376-13.117188-11.050781.0625-21.417968 4.96875-28.5 13.460938l-79.234374 95.101562-25.8125-25.75c-14.589844-14.589843-38.335938-14.589843-52.90625 0l-58.878907 58.859375v-201.363281c0-5.890625 4.777344-10.667969 10.664063-10.667969zm0 0"/></svg>
        </div>

        <div className={styles.input_wrap} onKeyPress={handleKeyDown}>
          <CastomInput 
            minRows='1' maxRows='4'
            placeholder="Введите сообщение"
            handleInput={handleInput}
            value={inputMsg}
          />
        </div>

        <div 
          className={styles.message_icons_sent} 
          title="Отправить сообщение"
          onClick={handleSend}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 511.398 511.398"><path d="m511.398 255.699-511.066-239.318 27.662 197.326-27.994 41.992 27.994 41.991-27.662 197.327zm-456.477-28.298 139.602 28.298-139.602 28.298-18.865-28.298zm385.736 28.298-402.933 188.682 18.222-129.982 289.587-58.7-289.587-58.7-18.222-129.982z"/></svg>
        </div>
      </div>
    </>
  )
}

export default ChatContent
