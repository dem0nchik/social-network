import React from 'react'
import styles from '../ViewEntity.module.css'

const Entity = (props) => {

  return (
    <div className={styles.entity}>
      <img src={props.data.profileImg || null} alt=""/>

      <p className={styles.entity_name}>{props.data.name || ''}</p>

      <button>{props.data.buttonText || 'Добавить'}</button>
    </div>
  )
}

export default Entity