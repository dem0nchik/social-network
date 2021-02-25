import React, { useEffect } from 'react'
import FriendInfo from './FriendInfo/FriendInfo'
import GroupInfo from './GroupInfo/GroupInfo'
import styles from './Info.module.css'
import UserInfo from './UserInfo/UserInfo'

const Info = (props) => {

  const templateInfoRender = () => {
    if (props.pathname.includes('/group')) {
      return <GroupInfo />
    }
    if (props.pathname.includes('id')) {
      if (props.pathname.slice(3) === '01') {
        return <UserInfo />
      }
      else {
        return <FriendInfo />
      }
    }
    return <></>
  }  
  return (
    <div className={styles.info}>
      {templateInfoRender()}
  </div>
  )
}

export default Info