import React from 'react'
import FriendInfo from './FriendInfo/FriendInfo'
import GroupInfo from './GroupInfo/GroupInfo'
import styles from './Info.module.css'
import UserInfo from './UserInfo/UserInfo'

const Info = (props) => {

  const templateInfoRender = () => {
    if (+props.pathname.slice(3) === props.userData.id) {
        return <UserInfo 
                userData={props.userData}
                addNewProfileImgAction={props.addNewProfileImgAction}
                deleteProfileImgAction={props.deleteProfileImgAction}
               />
    }

    if (props.isAutorize && props.pathname.includes('/group')) {
      return <GroupInfo />
    } else if (props.pathname.includes('/group')) {
      return <GroupInfo />
    }

    if (props.isAutorize && props.pathname.includes('/id') && !props.userData.isUserDataFetching) {
      return <FriendInfo friendId={props.pathname.slice(3)}/>
    } else if (!props.isAutorize && props.pathname.includes('/id')) {
      return <FriendInfo friendId={props.pathname.slice(3)}/>
    }
    return null
  }
  return (
    <div className={styles.info}>
      {templateInfoRender()}
  </div>
  )
}

export default Info