import React, { useEffect, useState } from 'react'
import styles from './Wall.module.css'
import WallPost from './WallPost/WallPost'
import WallPostAdd from './WallPostAdd/WallPostAdd'
import { connect } from 'react-redux'
import { 
  addNewCommentToPostAction,
  addNewPostUserAction, 
  getElsePostUserAction, 
  getFirstPostUserAction, 
  getMoreCommentToPostAction, 
  fetchingElsePostAction, 
  likePostAction,
  unlikePostAction
} from '../../actions/postAction'
import Skeleton from 'react-loading-skeleton';
import { useInView } from 'react-intersection-observer';
import PhotoView from '../accessoryComponents/PhotoView/PhotoView'

const Wall = (props) => {

  const [isGroup, setIsGroup] = useState(false)
  const [isUser, setIsUser] = useState(false)
  const [photoToView, setPhotoToView] = useState({
    list: [],
    currentIndex: '0',
    show: false
  })

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (props.pathname.includes('/group')) {
      setIsGroup(true)
    }
    
    if (+props.pathname.slice(3) === props.userData.id) {
      setIsUser(true)
    }
  })

  useEffect(() => {
    const userId = props.pathname.slice(3)
    
    if (props.pathname.includes('/id')) {
      props.getFirstPostUserAction(userId)
    }
  }, [])

  useEffect(() => {
    const countOfFetchingPost = 10
    if ( inView && (props.post.postsData.length < +props.post.totalCount + countOfFetchingPost) &&
    props.post.postsData.length >=10) {
      props.fetchingElsePostAction()
    }
  }, [props.post.postsData, inView])

  useEffect(() => {
    if(props.post.postElseFetching) {
      props.getElsePostUserAction(props.pathname.slice(3), props.post.currentPage)
    }
  }, [props.post.postElseFetching])

  const handlePhoto = (list, index) => {
    setPhotoToView({list, currentIndex: index, show: true})
  }

  const templateWallPost = () => {
    return props.post.postsData.map((data,i) => {
      return <WallPost 
        key={i} 
        data={data} 
        isGroup={isGroup}
        handlePhoto={handlePhoto}
        likePostAction={props.likePostAction}
        unlikePostAction={props.unlikePostAction}
        addNewCommentToPostAction={props.addNewCommentToPostAction}
        isAutorize={props.isAutorize}
        getMoreCommentToPostAction={props.getMoreCommentToPostAction}
        pathname={props.pathname}
      />
    })
  }

  return (
    <div className={styles.wall}>
      {
        photoToView.show &&
        <PhotoView 
          list={photoToView.list} 
          currentIndex={photoToView.currentIndex} 
          close={() => setPhotoToView({...photoToView, show: false})}
        />
      }

      { !props.post.postFirstFetching ?
        <>
          { isUser && <WallPostAdd addNewPostUserAction={props.addNewPostUserAction}/> } 
          { 
            props.post.postsData?.length
            ? <>
                {
                  <>
                  {templateWallPost()}
                  {props.post.postElseFetching && <Skeleton style={{marginTop: '15px'}} height={'240px'}/>}
                  <div ref={ref}></div>
                  </>
                }
              </>
            : <p>Еще не добавлено ни одного поста</p>
          }
        </>
        : <>
          <Skeleton style={{marginTop: '20px'}} height={'139px'}/>
          <Skeleton style={{marginTop: '10px'}} height={'600px'}/>
        </>
      }
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  addNewPostUserAction: (postData) => dispatch(addNewPostUserAction(postData)),
  getFirstPostUserAction: (userId) => dispatch(getFirstPostUserAction(userId)),
  getElsePostUserAction: (userId, currentPage) => dispatch(getElsePostUserAction(userId, currentPage)),
  fetchingElsePostAction: () => dispatch(fetchingElsePostAction()),
  likePostAction: (postId) => dispatch(likePostAction(postId)),
  unlikePostAction: (postId) => dispatch(unlikePostAction(postId)),
  getMoreCommentToPostAction: (postId) => dispatch(getMoreCommentToPostAction(postId)),
  addNewCommentToPostAction: 
    (commentData, postId) => 
    dispatch(addNewCommentToPostAction(commentData, postId))
})
export default connect(store => ({post: store.post}), mapDispatchToProps)(Wall)