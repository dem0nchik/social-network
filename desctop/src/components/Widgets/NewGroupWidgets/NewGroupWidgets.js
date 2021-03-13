import React from 'react'
import styles from '../Widgets.module.css'

const NewGroupWidgets = (props) => {
  return (
    <div className={styles.group}>
      <a className={styles.title} href="/view?group=new"><h3 >Новые группы</h3></a>

      <div className={styles.entity__wrap}>
        <p className={styles.entity_nothing}>Нет ни одной группы</p>
      </div>
    </div>
  )
}

export default NewGroupWidgets