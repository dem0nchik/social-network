import React from 'react'
import styles from './CommentSection.module.css'
import CastomInput from '../../accessoryComponents/CastomInput/CastomInput'
import Comment from './Comment'

const CommentSection = (props) => {

  const templateCommnet = () => {
    if (!props.data) return null

    return props.data.map((data,i) => {
      return <Comment key={i} data={data}/>
    })
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      return
    } else if (e.key === 'Enter') {
      e.preventDefault()
      props.handleCommentSent()
    }
  }
  
  return (
    <div className={styles.comment_section}>
      <hr/>
      <h4>Комментарии</h4>
      
      <div className={styles.comment_wrap}>
        {templateCommnet()}

        {
          props.moreComments && 
          <p className={styles.comment_more}
             onClick={props.handleCommentsMore}
          >Загрузить еще</p>
        }
      </div>
      {
        props.isAutorize &&
        <div className={styles.comment_sent}>
          <div className={styles.comment_input_wrap} onKeyPress={handleKeyDown}>
            <CastomInput 
              placeholder='Напишите комментарий'
              handleInput={props.handleCommentValue}
              value={props.valueComment}
              maxRows='4'
            />
          </div>
          <button 
            disabled={!props.valueComment.trim()}
            onClick={props.handleCommentSent}
          >Отправить</button>
        </div>
      }
      
    </div>
  )
}

export default CommentSection