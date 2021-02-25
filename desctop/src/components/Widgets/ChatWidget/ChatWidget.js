import React from 'react'
import styles from './ChatWidget.module.css'

const ChatWidget = (props) => {

  return (
    <div className={styles.chat}>
      <a className={styles.chat__title} href="/chat"><h3 >Чаты</h3></a>

      <div className={styles.entity__wrap}>
        <div className={styles.entity}>
          <img src="public/img/user_icon.png" alt=""/>
          <p className={styles.entity__name}>Игорь</p>
          <span>1</span>
        </div>

        <div className={styles.entity}>
          <img src="public/img/user_icon.png" alt=""/>
          <p className={styles.entity__name}>Дима</p>
          <span>3</span>
        </div>

        <div className={styles.entity}>
          <img src="public/img/B8cmFs_z_400x400.jpg" alt=""/>
          <p className={styles.entity__name}>Тимур</p>
        </div>
        
        <div className={styles.entity}>
          <img src="public/img/B8cmFs_z_400x400.jpg" alt=""/>
          <p className={styles.entity__name}>Тимур</p>
        </div>

        <div className={styles.entity}>
          <img src="public/img/B8cmFs_z_400x400.jpg" alt=""/>
          <p className={styles.entity__name}>Тимур</p>
        </div>
        
        <div className={styles.entity}>
          <img src="public/img/B8cmFs_z_400x400.jpg" alt=""/>
          <p className={styles.entity__name}>Тимур</p>
        </div>
        <div className={styles.entity}>
          <img src="public/img/B8cmFs_z_400x400.jpg" alt=""/>
          <p className={styles.entity__name}>Тимур</p>
        </div>
      </div>
    </div>
  )
}

export default ChatWidget