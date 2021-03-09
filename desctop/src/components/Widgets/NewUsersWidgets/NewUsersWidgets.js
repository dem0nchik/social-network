import React from 'react'
import styles from './NewUsersWidgets.module.css'

const NewUsersWidgets = (props) => {
  return (
    <div className={styles.users}>
      <a className={styles.title} href="/view?user=new"><h3 >Новые Пользователи</h3></a>

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
      </div>
    </div>
  )
}

export default NewUsersWidgets