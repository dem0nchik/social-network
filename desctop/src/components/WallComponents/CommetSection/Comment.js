import React from 'react'
import styles from './CommentSection.module.css'
import utilits from '../../../utilits/utilits'

const Comment = (props) => {
  const date = props.data.date ? utilits.parseDate(new Date(props.data.date), true) : ''
  const imageEntity = props.data.profileImg || "/public/img/user_icon.jpg"
  
  return (
    <div className={styles.comment}>
      <div className={styles.comment_header}>
        <a href={`/id${props.data.userId}`}>
          <img src={imageEntity} alt="user img"/>
        </a>
        <div className={styles.comment_description}>
          <a href={`/id${props.data.userId}`}>
            <p className={styles.comment_name}>{props.data.name || ''}</p>
          </a>
          <sub className={styles.comment_date}>{date ? `${date.dateNow}, ${date.timeNow}` : 'date:'}</sub>
        </div>
      </div>
      <pre className={styles.comment_text}>{props.data.bodyText || ''}</pre>
    </div>
  )
}

export default Comment