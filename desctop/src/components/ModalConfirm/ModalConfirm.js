import React from 'react'
import styles from './ModalConfirm.module.css'

const ModalConfirm = (props) => {
  return (
    <>
      <div onClick={e => (props.callback ? props.callback(e) : null)} className={styles.overlay}></div>
      
      <div className={styles.displayInfo}>
        <div className={styles.description}>
          {<pre>{props.description}</pre> || 'Info'}
          {props.link && <a href={props.link}>{props.link}</a>}
        </div>
        <button onClick={e => (props.callback ? props.callback(e) : null)} className={styles.contfirm}>Подтвердить</button>
      </div>
    </>
  )
}

export default ModalConfirm