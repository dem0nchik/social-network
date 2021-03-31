import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { handleChatAction } from '../../actions/chatAction'
import { addNewFriendAction, friendDataAction, removeFriendAction } from '../../actions/friendAction'
import { getUserImagesAction } from '../../actions/infoAction'
import { addNewProfileImgAction, deleteProfileImgAction } from '../../actions/userAction'
import FriendInfo from './FriendInfo/FriendInfo'
import GroupInfo from './GroupInfo/GroupInfo'
import styles from './Info.module.css'
import UserInfo from './UserInfo/UserInfo'

const Info = (props) => {

  const [userNoExists, setUserNoExists] = useState(false)

  useEffect(() => {
    const friendId = +props.pathname.slice(3)

    if (friendId !== props.userData.id && 
        Number.isInteger(friendId) && 
        props.pathname.slice(0, 3) === '/id' &&
        !userNoExists
    ) {
      props.friendDataAction(friendId)
    }
    if (Number.isInteger(friendId) && props.pathname.slice(0, 3) === '/id') {
      props.getUserImagesAction(friendId)
    }

  }, [props.userData.id])

  useEffect(() => {
    setUserNoExists(!!props.friend.error ? true : false)
  }, [props.friend])


  useEffect(() => {
    const friendId = Number.parseInt(props.pathname.slice(3))
    if(!Number.isInteger(friendId)) {
      setUserNoExists(true)
    }
  }, [])
  
  const templateInfoRender = () => {
    if (+props.pathname.slice(3) === props.userData.id) {
        return <UserInfo 
                userData={props.userData}
                isAutorize={props.isAutorize}
                addNewProfileImgAction={props.addNewProfileImgAction}
                deleteProfileImgAction={props.deleteProfileImgAction}
                imagesUser={props.info.imagesUser}
               />
    }

    if (props.isAutorize && props.pathname.includes('/group')) {
      return <GroupInfo />
    } else if (props.pathname.includes('/group')) {
      return <GroupInfo />
    }

    if (props.isAutorize && props.pathname.includes('/id') && !props.userData.isUserDataFetching) {
      return <FriendInfo 
          friendId={props.pathname.slice(3)}
          userData={props.friend}
          isAutorize={props.isAutorize}
          userNoExists={userNoExists}
          addNewFriendAction={props.addNewFriendAction}
          removeFriendAction={props.removeFriendAction}
          handleChatAction={props.handleChatAction}
          imagesUser={props.info.imagesUser}
        />
    } else if (!props.isAutorize && props.pathname.includes('/id')) {
      return <FriendInfo 
          friendId={props.pathname.slice(3)}
          userData={props.friend}
          isAutorize={props.isAutorize}
          userNoExists={userNoExists}
          removeFriendAction={props.removeFriendAction}
        />
    }

    return null
  }

  return (
    <div className={styles.info}>
      {templateInfoRender()}
  </div>
  )
}

const mapDispatchToProps = dispatch => ({
  friendDataAction: (friendId) => dispatch(friendDataAction(friendId)),
  addNewFriendAction: (friendId) => dispatch(addNewFriendAction(friendId)),
  removeFriendAction: (friendId) => dispatch(removeFriendAction(friendId)),

  getUserImagesAction: (userId) => dispatch(getUserImagesAction(userId)),

  handleChatAction: (friendId) => dispatch(handleChatAction(friendId)),
  
  addNewProfileImgAction: imgData => dispatch(addNewProfileImgAction(imgData)),
  deleteProfileImgAction: () => dispatch(deleteProfileImgAction())
})
export default connect(store => ({friend: store.friend, info: store.info}), mapDispatchToProps)(Info)