import React from 'react'
import styles from './InfoEntity.module.css'

const Entity = props => {
  const imageEntity = props.data?.profileImg || "/public/img/user_icon.jpg"

  const nameEntity = () => {
    if (props.data.name) {
      return props.data.name.length > 20 ? props.data.name.substr(0, 24) : props.data.name
    } else {
      return ''
    }
  }
  
  return (
    <div className={styles.entity}>
      <a href={props.data.link || '/'}>
        <img src={imageEntity} alt="entity" width={45} height={45}/>
        <p className={styles.name_entity}>{nameEntity()}</p>
      </a>
    </div>
  )
}

export default Entity
