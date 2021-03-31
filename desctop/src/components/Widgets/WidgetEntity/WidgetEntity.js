import React from 'react'
import styles from './WidgetEntity.module.css'

const WidgetEntity = (props) => {
  const imageEntity = props.profileImg || "/public/img/user_icon.jpg"

  return (
    <div className={styles.entity}>
      <a href={props.link || '/'}>
        <img src={imageEntity} alt=""/>
        <p className={styles.entity__name}>{props.name || ''}</p>
        <span></span>
      </a>
    </div>
  )
}

export default WidgetEntity
