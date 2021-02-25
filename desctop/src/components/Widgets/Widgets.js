import React from 'react'
import AutorizeWidget from './AutorizeWidget/AutorizeWidget'
import ChatWidget from './ChatWidget/ChatWidget'
import styles from './Widgets.module.css'

const Widgets = (props) => {
  return (
    <div className={styles.widgets}>
      { !props.isAutorize
      ? <AutorizeWidget />
      : <>
          <ChatWidget />
        </> }
    </div>
  )
}

export default Widgets