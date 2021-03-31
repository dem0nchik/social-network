import React from 'react'
import { connect } from 'react-redux'
import { getListLastUsersAction } from '../../actions/infoAction'
import AutorizeWidget from './AutorizeWidget/AutorizeWidget'
import ChatWidget from './ChatWidget/ChatWidget'
import NewGroupWidgets from './NewGroupWidgets/NewGroupWidgets'
import NewUsersWidgets from './NewUsersWidgets/NewUsersWidgets'

import StickyHeader from '../accessoryComponents/StickyHeader/StickyHeader'
import styles from './Widgets.module.css'
import { getChatWidgetListAction, newMessageInterlocutorFromSocketToWidgetAction } from '../../actions/chatAction'

const Widgets = (props) => {
  return (
    <StickyHeader top={67}>
      <div className={styles.widgets}>
        { !props.isAutorize
        ? <AutorizeWidget />
        : <>
            <ChatWidget 
              data={props.chat.widgetList}
              getChatWidgetListAction={props.getChatWidgetListAction}
              newMessageInterlocutorFromSocketToWidgetAction={props.newMessageInterlocutorFromSocketToWidgetAction}
            />
            <NewUsersWidgets 
              getListLastUsersAction={props.getListLastUsersAction}
              data={props.info.listUsers}
            />
            <NewGroupWidgets />
          </> }
      </div>
    </StickyHeader>
  )
}


const mapDispatchToProps = dispatch => ({
  getListLastUsersAction: () => dispatch(getListLastUsersAction()),

  getChatWidgetListAction: () => dispatch(getChatWidgetListAction()),
  newMessageInterlocutorFromSocketToWidgetAction: (chatId) => dispatch(newMessageInterlocutorFromSocketToWidgetAction(chatId)),
  
})
export default connect(store => ({info: store.info, chat: store.chat}), mapDispatchToProps)(Widgets)