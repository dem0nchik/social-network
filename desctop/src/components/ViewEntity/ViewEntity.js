import React, { useEffect } from 'react'
import Entity from './Entity/Entity'
import styles from './ViewEntity.module.css'

const ViewEntity = (props) => {
  useEffect(() => {
    document.title = 'Просмотр | xcxlow'
  })
  return(
    <div className={styles.view}>
      <h2>Просмотр</h2>
      
      <div className={styles.entity_wrap}></div>
        <Entity data={{
          profileImg: 'public/img/6549ac99-e4e6-45ca-84a6-a762b2ef23dd.jpg',
          name: 'Иван Простой'
        }} />
        <Entity data={{
          profileImg: 'public/img/photo607527866119335348.jpg',
          name: 'Влад Норгонев'
        }} />
        <Entity data={{
          profileImg: 'public/img/user_icon.png',
          name: 'Саня Огерко'
        }} />
        <Entity data={{
          profileImg: 'public/img/kQkS4bYGF3A.jpg',
          name: 'Луйка Овченка'
        }} />
    </div>
  )
}

export default ViewEntity