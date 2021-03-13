import React, { useEffect } from 'react'
import queryString from 'query-string'
import { connect } from 'react-redux'
import { getAllFriendListAction, getFriendListToViewAction } from '../../actions/friendAction'
import styles from './ViewEntity.module.css'
import ViewFriends from './ViewFriends/ViewFriends'

const ViewEntity = (props) => {
  const [issues, setIssues] = React.useState('')
  const [title, setTitle] = React.useState('Просмотр')

  useEffect(() => {
    if(props.pathname.includes('/friend')) {
      props.getAllFriendListAction()

      document.title = 'Друзья | xcxlow'
    }

    else if (props.pathname.includes('/view')) {

      const parsed = queryString.parse(props.location.search)
      if (parsed.view === 'friend' && Number.isInteger(+parsed.userId)) {
        setTitle(`Друзья ${props.friend.friendList.count}`)

        props.getFriendListToViewAction(parsed.userId)

      } else {
        setIssues('Извините вы ввели неправильный запрос')
      }
    }
    else
      document.title = 'Просмотр | xcxlow'
  }, [props.friend.friendList])    

  return(
    <div className={styles.view}>
      <h2>{title}</h2>
      
      <div className={styles.entity_wrap}>
        {
          !!issues
           ? <p className={styles.entity_nothing}>{issues}</p>
           : <ViewFriends data={props.friend.friendList.list}/>
        }
      </div>
               
    </div>
  )
}
const mapDispatchToProps = dispatch => ({
  getAllFriendListAction: () => dispatch(getAllFriendListAction()),
  getFriendListToViewAction: (userId) => dispatch(getFriendListToViewAction(userId)),
})
export default connect(store => ({friend: store.friend}), mapDispatchToProps)(ViewEntity)