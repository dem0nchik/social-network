import React, { useState } from 'react'
import styles from './InfoAvatar.module.css'


const InfoAvatar = (props) => {
  const [showActions, setShowActions] = useState(false)

  const handleMouseMove = e => {
    if (e.type === 'mouseenter') {
      setShowActions(true)
    }
    if (e.type === 'mouseleave') {
      setShowActions(false)
    }
  }

  const imageProfile = props.profileImg || "/public/img/user_icon.png"
  
  return (
    <div 
      className={styles.info_avatar}
      onMouseEnter={handleMouseMove}
      onMouseLeave={handleMouseMove}
    >
      <img src={imageProfile} alt="Фото профиля"/>

      { props.isUserProfile &&
        <div 
          className={styles.info_avatar__actions}
          style={{visibility: showActions ? 'visible' : 'hidden'}}
        >
          <label className={styles.input_add} title='Выберите файл'>
            Добавить Фото<input onInput={props.selectImgProfile} title='Картинка профиля' type="file" name="image" />
          </label>

          { 
            props.profileImg 
            && <button 
                  onClick={props.deleteImgProfile}
                  className={styles.button_remove} 
                  title='Удалить фотографию'
              >Убрать фото</button> 
          }
        </div>
      }
    </div>
  )
}

export default InfoAvatar