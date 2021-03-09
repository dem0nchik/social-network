import React from 'react'
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
          <NewUsersWidgets />
          <NewGroupWidgets />
        </> }
    </div>
  )
}

export default Widgets