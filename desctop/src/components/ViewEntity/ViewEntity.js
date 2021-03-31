import React, { useEffect } from 'react'
import queryString from 'query-string'
import { connect } from 'react-redux'
import { getAllFriendListAction, getFriendListToViewAction } from '../../actions/friendAction'
import styles from './ViewEntity.module.css'
import ViewFriends from './ViewFriends/ViewFriends'
import { getListAllPeopleToViewAction } from '../../actions/infoAction'

const ViewEntity = (props) => {
  const [issues, setIssues] = React.useState('')
  const [title, setTitle] = React.useState('Просмотр')
  const [list, setList] = React.useState([])

  useEffect(() => {
    if(props.pathname.includes('/friend')) {
      props.getAllFriendListAction()
      document.title = 'Друзья | xcxlow'
    }

    else if (props.pathname.includes('/view')) {
      const parsed = queryString.parse(props.location.search)
      
      if (parsed.view === 'friend' && Number.isInteger(+parsed.userId)) {
        props.getFriendListToViewAction(parsed.userId)
      } else if (parsed.view === 'all') {
        props.getListAllPeopleToViewAction()
      } else if (parsed.user === 'new') {
        props.getListAllPeopleToViewAction()
      } else {
        setIssues('Извините вы ввели неправильный запрос')
      }
    }

    else
      document.title = 'Просмотр | xcxlow'
  }, []) 
  
  useEffect(() => {
    setTitle(`Друзья ${props.friend.friendList.count}`)
    setList(props.friend.friendList.list)
  }, [props.friend.friendList])

  useEffect(() => {
    setTitle(`Пользователи`)
    setList(props.info.listAllusers)
  }, [props.info.listAllusers])
  
  return(
    <div className={styles.view}>
      <h2>{title}</h2>
      
      <div className={styles.entity_wrap}>
        {
          !!issues
           ? <p className={styles.entity_nothing}>{issues}</p>
           : <ViewFriends data={list}/>
        }
      </div>
               
    </div>
  )
}
const mapDispatchToProps = dispatch => ({
  getAllFriendListAction: () => dispatch(getAllFriendListAction()),
  getFriendListToViewAction: (userId) => dispatch(getFriendListToViewAction(userId)),

  getListAllPeopleToViewAction: () => dispatch(getListAllPeopleToViewAction()),
})
export default connect(store => ({
  friend: store.friend,
  info: store.info
}), mapDispatchToProps)(ViewEntity)