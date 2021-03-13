import React, {useState} from 'react'
import styles from './WallPost.module.css'
import PhotoResize from '../PhotosResize/PhotosResize'
import CommentSection from '../CommetSection/CommentSection'

const WallPost = (props) => {
  const [valueComment, setValueComment] = useState('')

  const commentData = props.data.commentData || 0
  const images = props.data.images || []

  const handleLike = () => {
    if (!props.data.selfLike && props.isAutorize) {
      props.likePostAction(props.data.postId)      
    } else if (props.data.selfLike && +props.data.heartCount > 0 && 
               props.isAutorize ) {
      props.unlikePostAction(props.data.postId)
    }
  }

  const handleCommentSent = () => {
    props.addNewCommentToPostAction(valueComment, props.data.postId)
    setValueComment('')
  }

  const handleCommentValue = (e) => {
    setValueComment(e.currentTarget.value)
  }

  const handleCommentsMore = () => {
    props.getMoreCommentToPostAction(props.data.postId)
  }

  const handlePhoto = (index) => {
    props.handlePhoto(images, index)
  }
  
  return (
    <div className={styles.post}>
       <div className={styles.post_header}>
         <a href={props.pathname}>
           <img src={props.data.profileImg || null} alt=""/>
          </a>
         <div className={styles.post_description}>
          <a href={props.pathname}>
            <p className={styles.post_name}>{props.data.name || ''}</p>
          </a>
          <sub className={styles.post_date}>{props.data.date || 'date:'}</sub>
         </div>
          { props.isGroup && <button>Подписаться</button> }
       </div>

       <pre className={styles.post_text}>{props.data.bodyText || ''}</pre>

      { images.length 
        ? <div className={styles.post_images_wrap}>
          <PhotoResize images={images} handlePhoto={handlePhoto}/>
        </div>
        : null
      }
       

       <div className={styles.post_icons_wrap}>
        <div 
          className={`${styles.icons} 
          ${
            (+props.data.heartCount || 0) 
            && 
            (props.data.selfLike && styles.heart_active)
          }`}
          onClick={handleLike}
          disabled={!props.isAutorize}
          title={!props.isAutorize ? 'Ставить лайк можно только авторизированным пользователям' : ''}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" > 
            <defs>
            <linearGradient id="MyGradient"  x1="0" x2="0" y1="0" y2="1">
              <stop offset="40%" stopColor="#F40" />
              <stop offset="95%" stopColor="rgb(212, 212, 66)" />
            </linearGradient>
            </defs><g><g><path d="M376,30c-27.783,0-53.255,8.804-75.707,26.168c-21.525,16.647-35.856,37.85-44.293,53.268    c-8.437-15.419-22.768-36.621-44.293-53.268C189.255,38.804,163.783,30,136,30C58.468,30,0,93.417,0,177.514    c0,90.854,72.943,153.015,183.369,247.118c18.752,15.981,40.007,34.095,62.099,53.414C248.38,480.596,252.12,482,256,482    s7.62-1.404,10.532-3.953c22.094-19.322,43.348-37.435,62.111-53.425C439.057,330.529,512,268.368,512,177.514    C512,93.417,453.532,30,376,30z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
          <span>{props.data.heartCount || 0}</span>
        </div>
        <div className={styles.icons}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 511.096 511.096"><g><g><path d="m74.414 480.548h-36.214l25.607-25.607c13.807-13.807 22.429-31.765 24.747-51.246-59.127-38.802-88.554-95.014-88.554-153.944 0-108.719 99.923-219.203 256.414-219.203 165.785 0 254.682 101.666 254.682 209.678 0 108.724-89.836 210.322-254.682 210.322-28.877 0-59.01-3.855-85.913-10.928-25.467 26.121-59.973 40.928-96.087 40.928z"/></g></g></svg>
          <span>{commentData.length || 0}</span>
        </div>
      </div>
      
      { 
        <CommentSection 
          addNewCommentToPostAction={props.addNewCommentToPostAction}
          data={props.data.commentData || null}
          moreComments={props.data.moreComments}
          isAutorize={props.isAutorize}
          valueComment={valueComment}
          handleCommentValue={handleCommentValue}
          handleCommentSent={handleCommentSent}
          handleCommentsMore={handleCommentsMore}
        />
      }
    </div>
  )
}

export default WallPost
