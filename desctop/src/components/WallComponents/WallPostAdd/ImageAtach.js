import React from 'react'
import styles from './WallPostAdd.module.css'

const ImageAtach = (props) => {
  
  const handleDelete = e => {
    props.deleteAtach(e.currentTarget.id)
  }
  return (
    <div className={styles.atach_img}>
      <img src={props.src} alt="Добавленное фото"/>
      <span onClick={handleDelete} id={props.id} title='Удалить фото'>x</span>
    </div>
  )
}

export default ImageAtach