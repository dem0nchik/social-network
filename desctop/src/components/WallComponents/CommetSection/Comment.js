import React from 'react'
import styles from './CommentSection.module.css'

const Comment = (props) => {
  console.log(props.data);
  return (
    <div className={styles.comment}>
      <div className={styles.comment_header}>
        <a href={`/id${props.data.userId}`}>
          <img src={props.data.profileImg || null} alt="user img"/>
        </a>
        <div className={styles.comment_description}>
          <a href={`/id${props.data.userId}`}>
            <p className={styles.comment_name}>{props.data.name || ''}</p>
          </a>
          <sub className={styles.comment_date}>{props.data.date || 'date:'}</sub>
        </div>
      </div>
      <pre className={styles.comment_text}>{props.data.bodyText || ''}</pre>
    </div>
  )
}

export default Comment