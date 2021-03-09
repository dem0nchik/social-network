import React from 'react'
import styles from './NewGroupWidgets.module.css'

const NewGroupWidgets = (props) => {
  return (
    <div className={styles.group}>
      <a className={styles.title} href="/view?group=new"><h3 >Новые группы</h3></a>

      <div className={styles.entity__wrap}>
        <div className={styles.entity}>
          <img src="public/img/user_icon.png" alt=""/>
          <p className={styles.entity__name}>Мастер</p>
          <span>1</span>
        </div>

        <div className={styles.entity}>
          <img src="public/img/user_icon.png" alt=""/>
          <p className={styles.entity__name}>Пришельцы наступают</p>
          <span>3</span>
        </div>

        <div className={styles.entity}>
          <img src="public/img/B8cmFs_z_400x400.jpg" alt=""/>
          <p className={styles.entity__name}>Собаки</p>
        </div>
      </div>
    </div>
  )
}

export default NewGroupWidgets