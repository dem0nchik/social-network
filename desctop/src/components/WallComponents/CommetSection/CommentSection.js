import React from 'react'
import styles from './CommentSection.module.css'
import CastomInput from '../../accessoryComponents/CastomInput/CastomInput'
import Comment from './Comment'

const CommentSection = (props) => {

  const templateCommnet = () => {
    if (!props.data) return <></>

    return props.data.map((data,i) => {
      return <Comment key={i} data={data}/>
    })
  }

  return (
    <div className={styles.comment_section}>
      <hr/>
      <h4>Комментарии</h4>
      
      <div className={styles.comment_wrap}>
        {templateCommnet()}
      </div>

      <div className={styles.comment_sent}>
        <div className={styles.comment_input_wrap}>
          <CastomInput placeholder='Напишите комментарий'/>
        </div>
        <button>Отправить</button>
      </div>
      
    </div>
  )
}

export default CommentSection