import React from 'react'
import styles from './FriendInfo.module.css'

const ButtonAdd = (props) => {
  const [showActions, setShowActions] = React.useState(false)

  const handleMouseMove = e => {
    if (e.type === 'mouseenter') {
      setShowActions(true)
    }
    if (e.type === 'mouseleave') {
      setShowActions(false)
    }
  }

  const handleNewUser = () => {
    if (Number.isInteger(+props.friendId)) {
     props.addNewFriendAction(+props.friendId)
     setShowActions(true)
    }
  }

  const handleRemoveUser = () => {
    if (Number.isInteger(+props.friendId)) {
     props.removeFriendAction(+props.friendId)
     setShowActions(true)
    }
  }

  const isFetchingButton = () => {
    return props.fetchAddingAndRemove
  }

  return (
    <>
    { 
      !props.isFriend 
      ?  <button 
          className={`${styles.button_add_friend} ${styles.button_add}`}
          onClick={() => handleNewUser()}
          disabled={isFetchingButton()}
          title='Добавит обоим взаимную связь'
        >Установить связь</button>
      : 
        <div 
          className={styles.button_connect}
          onMouseEnter={handleMouseMove}
          onMouseLeave={handleMouseMove}
        >
          {
            !showActions 
              ? <button 
              className={`${styles.button_add}`}
              >Связь установлена ✔</button>

            : <button 
              className={`${styles.button_remove_friend} ${styles.button_add}`}
              onClick={() => handleRemoveUser()}
              disabled={isFetchingButton()}
              title='Уберет у обоих взаимную связь'
            >Убрать связь</button>
          }
        </div>
          
    }
    </>
  )
}

export default ButtonAdd