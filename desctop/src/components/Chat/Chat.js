import React, { useEffect } from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { connect } from 'react-redux'
import socket from '../../socketio/socketio'

import StickyHeader from '../accessoryComponents/StickyHeader/StickyHeader'
import ChatContent from './ChatContent/ChatContent'
import ChatList from './ChatList/ChatList'

import styles from './Chat.module.css'
import { 
  getChatListAction, 
  getInfoOfChatAction,
  sendMessageAction,
  messageFromSocketAction,
  newMessageInterlocutorFromSocketToChatsAction,
} from '../../actions/chatAction';

const Chat = (props) => {
  useEffect(() => {
    document.title = 'Чат | xcxlow'
    
    if(props.pathname.startsWith('/chats')) {
      props.getChatListAction()
    }
    
    socket.on('INTERLOCUTOR:NEW_MESSAGE', (data) => {
      props.newMessageInterlocutorFromSocketToChatsAction(data)
    })


    return () => {
      socket.off('INTERLOCUTOR:NEW_MESSAGE')
      socket.off('MESSAGE:NEW')
    }
    
  }, [])
  
  useEffect(() => {
    socket.on('MESSAGE:NEW', (data) => {
      props.messageFromSocketAction(data);
    })

    return () => {
      socket.off('MESSAGE:NEW')
    }
  }, [props.chat.messageList])
  
  return (
  <StickyHeader top={67}>
    <div className={styles.chat}>
    <Router>
      <Switch>
        <Route path="/chats" component={() => <ChatList 
          data={props.chat.listChats}
        />} /> 
        <Route path="/:chatId" component={propsRoute => <ChatContent 
          {...propsRoute}  
          socket={socket}
          data={props.chat}
          getInfoOfChatAction={props.getInfoOfChatAction}
          sendMessageAction={props.sendMessageAction}
          userData={props.user}
        />} />
      </Switch>
    </Router>
    </div>
  </StickyHeader>
  )
}



const mapDispatchToProps = dispatch => ({
  getChatListAction: () => dispatch(getChatListAction()),
  getInfoOfChatAction: (chatId) => dispatch(getInfoOfChatAction(chatId)),

  sendMessageAction: (dataToSocket, socket) => dispatch(sendMessageAction(dataToSocket, socket)),

  messageFromSocketAction: (message) => dispatch(messageFromSocketAction(message)),

  newMessageInterlocutorFromSocketToChatsAction: (data) => dispatch(newMessageInterlocutorFromSocketToChatsAction(data))
})
export default connect(store => ({chat: store.chat, user: store.user}), mapDispatchToProps)(Chat)