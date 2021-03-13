import React from 'react'
import { connect } from 'react-redux'
import { getListLastUsersAction } from '../../actions/infoAction'
import AutorizeWidget from './AutorizeWidget/AutorizeWidget'
import ChatWidget from './ChatWidget/ChatWidget'
import NewGroupWidgets from './NewGroupWidgets/NewGroupWidgets'
import NewUsersWidgets from './NewUsersWidgets/NewUsersWidgets'
import styles from './Widgets.module.css'

const Widgets = (props) => {
  return (
    <div className={styles.widgets}>
      { !props.isAutorize
      ? <AutorizeWidget />
      : <>
          <ChatWidget />
          <NewUsersWidgets 
            getListLastUsersAction={props.getListLastUsersAction}
            data={props.info.listUsers}
          />
          <NewGroupWidgets />
        </> }
    </div>
  )
}


const mapDispatchToProps = dispatch => ({
  getListLastUsersAction: () => dispatch(getListLastUsersAction())
})
export default connect(store => ({info: store.info}), mapDispatchToProps)(Widgets)