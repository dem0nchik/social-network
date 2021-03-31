import React, { useEffect, useState }  from 'react'
import ModalConfirm from '../../accessoryComponents/ModalConfirm/ModalConfirm'
import UserImagesInfo from '../AdditionalInfo/UserImagesInfo'
import InfoAvatar from '../InfoAvatar/InfoAvatar'
import InfoEntity from '../InfoEntity/InfoEntity'
import styles from './UserInfo.module.css'

const UserInfo = (props) => {

  const [showModal, setShowModal] = useState(null)

  const modalCallback = () => {
    setShowModal(null)
  }

  useEffect(() => {
    document.title = `${props.userData.name} ${props.userData.surname} | xcxlow`
  })

  const selectImgProfile = e => {
    const files = e.currentTarget.files
    
    if (files[0]){
      if (files[0].type.includes('image')) {
        const imgData = new FormData()
        
        imgData.append('profileImg', files[0])

        props.addNewProfileImgAction(imgData)
      } else {
        setShowModal(
          <ModalConfirm 
            callback={modalCallback} 
            description='Пожалуйста выберите правильный формат изображения'
          />
        )
      }
    }
  }

  const deleteImgProfile = () => {
    props.deleteProfileImgAction()
  }


  const whatEntity = {
    group: 'group',
    friend: 'friend'
  }

  return (
    <>
    <div className={styles.info__group}>

      {showModal}

      <div className={styles.group__wrapper}>
        <InfoEntity 
            whatEntity={whatEntity.group}
            isAutorize={props.isAutorize}
            userId={props.userData.id}
            isUserProfile={true}
            data={[]}
          />
        <InfoEntity 
            whatEntity={whatEntity.friend}
            isAutorize={props.isAutorize}
            userId={props.userData.id}
            isUserProfile={true}
            count={props.userData.friendList.count}
            data={props.userData.friendList.list}
          />
      </div>


      <div className={styles.additional_info}>
        <UserImagesInfo imagesUser={props.imagesUser}/>
      </div>
    </div>

    <div className={styles.info__user}>
      <InfoAvatar 
        profileImg={props.userData.profile_img} 
        isUserProfile={true} 
        selectImgProfile={selectImgProfile}
        deleteImgProfile={deleteImgProfile}
      />
      <h3>{`${props.userData.name} ${props.userData.surname}`}</h3>

      <div className={styles.button_wrap}>
        <a href="/setings">Настройки</a>
      </div>
    </div>
  </>
  )
}

export default UserInfo