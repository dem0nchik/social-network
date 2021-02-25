import React, { useEffect } from 'react'
import styles from './GroupInfo.module.css'

const GroupInfo = (props) => {
  useEffect(() => {
    document.title = 'Мастер | xcxlow'
  })
  return (
    <div className={styles.info}>
      <p>GroupInfo - Мастер</p>
  </div>
  )
}

export default GroupInfo