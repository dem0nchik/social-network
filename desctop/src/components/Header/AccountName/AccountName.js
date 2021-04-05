import React, {useState} from 'react'
import styles from './AccountName.module.css'
import config from '../../../config'

const AccountName = (props) => {
  const [menu, showMenu] = useState(false)

  const handleShowMenu = () => {
    showMenu(!menu)
  }
  
  const linkId = () => {
    return props.userData.id ? `/id${props.userData.id}` : '/'
  }

  return (
    <>
      <div onClick={handleShowMenu} className={styles.name__wrapper}>
        <p className={styles.name}>{`${props.userData.name} ${props.userData.surname}`}</p>
      </div>
      {
        menu &&
        <>
        <div onClick={handleShowMenu} className={styles.overlay}></div>
        <div className={styles.user_menu}>
          <ul>
            <a href={linkId()}><li>Профиль</li></a>
            <a href="/settings"><li>Настройки</li></a>
            <a href={config.API_URL+'/api/autorize/logout'}><li>Выйти</li></a>
          </ul>
        </div>
        </>
      }

      
    </>
  )
}

export default AccountName