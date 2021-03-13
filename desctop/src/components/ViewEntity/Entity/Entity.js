import React from 'react'
import styles from '../ViewEntity.module.css'

const Entity = (props) => {
  const imageEntity = props.profileImg || "/public/img/user_icon.png"

  return (
    <div className={styles.entity}>
      <a href={props.link || '/'}>
        <img src={imageEntity} alt=""/>
        <p className={styles.entity_name}>{props.name || ''}</p>
      </a>
      
      {
        props.showButtonAdd &&
        <button>{props.data.buttonText || 'Добавить'}</button>
      }
    </div>
  )
}

export default Entity