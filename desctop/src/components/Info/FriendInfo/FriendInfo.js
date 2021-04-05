import React, { useEffect } from 'react'
import PhotoView from '../../accessoryComponents/PhotoView/PhotoView'
import DescriptionUser from '../AdditionalInfo/DescriptionUser'
import UserImagesInfo from '../AdditionalInfo/UserImagesInfo'
import InfoAvatar from '../InfoAvatar/InfoAvatar'
import InfoEntity from '../InfoEntity/InfoEntity'
import ButtonAdd from './ButtonAdd'
import styles from './FriendInfo.module.css'

const FriendInfo = (props) => {
  const [photoToView, setPhotoToView] = React.useState(false)

  useEffect(() => {
    !props.userNoExists 
    ? document.title = `${props.userData.name} ${props.userData.surname} | xcxlow`
    : document.title = `Не найдено | xcxlow`
  })

  const whatEntity = {
    group: 'group',
    friend: 'friend'
  }

  const handlePhoto = () => {
    setPhotoToView(true)
  }
  
  return (
    <>
    {
      photoToView &&
      <PhotoView 
        list={[props.userData.profile_img]} 
        currentIndex={0} 
        close={() => setPhotoToView(false)}
      />
    }
    <div className={styles.info__group}>
      { !props.userNoExists ?
      <>
        <div className={styles.group__wrapper}>
          <InfoEntity 
            whatEntity={whatEntity.group}
            isAutorize={props.isAutorize}
            userId={props.friendId}
            data={[]}
          />
          <InfoEntity 
            whatEntity={whatEntity.friend}
            isAutorize={props.isAutorize}
            userId={props.friendId}
            count={props.userData.friendList.count}
            data={props.userData.friendList.list}
          />
        </div>


        <div className={styles.additional_info}>
          <UserImagesInfo imagesUser={props.imagesUser}/>
          <DescriptionUser desc={props.userData.description}/>
        </div>

      </> :
      <h2 className={styles.no_found}>Пользователь не был найден</h2>
      }
    </div>

    <div className={styles.info__user}>
      <InfoAvatar 
        profileImg={props.userData.profile_img} 
        isUserProfile={false} 
        viewPhoto={handlePhoto}
      />
      {
      !props.userNoExists 
        ? <>
            <h3>{`${props.userData.name} ${props.userData.surname}`}</h3>
            {
              props.isAutorize ?
                <div className={styles.button_wrap}>
                  <ButtonAdd
                    friendId={props.friendId}
                    isFriend={props.userData.isActiveFriend}
                    addNewFriendAction={props.addNewFriendAction}
                    removeFriendAction={props.removeFriendAction}
                    fetchAddingAndRemove={props.userData.fetchAddingAndRemove}
                  />
                  <button
                    onClick={() => props.handleChatAction(props.friendId)}
                  >Чат</button>
                </div>

              : <div className={styles.no_button}></div>
            }
          </>

        : <div className={styles.no_button}></div>
      }
    </div>
  </>
  )
}

export default FriendInfo