import React from 'react'
import styles from './CommentSection.module.css'

const Comment = (props) => {

  return (
    <div className={styles.comment}>
      <div className={styles.comment_header}>
        <img src={props.data.profileImg || null} alt="user img"/>
        <div className={styles.comment_description}>
          <p className={styles.comment_name}>{props.data.name || ''}</p>
          <sub className={styles.comment_date}>{props.data.date || 'date:'}</sub>
        </div>
      </div>
      <pre className={styles.comment_text}>{props.data.bodyText || ''}</pre>
    </div>
  )
}

export default Comment