import React, { useEffect, useState } from 'react'
import styles from './Settings.module.css'
import config from  '../../config'
import utilits from  '../../utilits/utilits'
import CastomInput from '../accessoryComponents/CastomInput/CastomInput'
import PhotoView from '../accessoryComponents/PhotoView/PhotoView'
import { connect } from 'react-redux'
import { setNewSettingsUserAction } from '../../actions/userAction'

const Settings = (props) => {
  const [photoToView, setPhotoToView] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    description: ''
  })

  useEffect(() => {
    document.title = 'Настройки | xcxlow'
  }, [])

  useEffect(() => {
    setFormData({...formData,
      name: props.user.name || '',
      surname: props.user.surname || '',
      description: props.user.description || ''
    })
  }, [props.user.name])
  

  const handleValues = (e) => {
    const {id, value} = e.currentTarget
    setFormData({...formData, [id]: value});
  }
  
  
  const validateButton = () => {
    if( formData.name.trim().length > 1
        && formData.surname.trim().length > 1
        &&(formData.surname.trim() !== props.user.surname 
          || formData.name.trim() !== props.user.name
        )
      && formData.description.trim().length < 250
    ){
        return false
    } else {
      if ( formData.description.trim() !== props.user.description
        && formData.surname.trim().length > 1
        && formData.name.trim().length > 1
        && formData.description.trim().length <= 250
      )
        return false
      else
        return true
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    props.setNewSettingsUserAction({
      name: formData.name === props.user.name ? '' : formData.name,
      surname: formData.surname === props.user.surname ? '' : formData.surname,
      description: formData.description === props.user.description ? '' : formData.description
    })
  }

  const handlePhoto = () => {
    if (props.user?.profile_img){
      setPhotoToView(true)
    }
  }
  

  const linkToProfile = props.user.id ? `${config.BASE_URL}/id${props.user.id}` : config.BASE_URL
  const hrefToProfile = props.user.id ? `/id${props.user.id}` : config.BASE_URL
  const dateCreate = props.user.data_created ? utilits.parseDate(new Date(props.user.data_created)) : ''
  const imageUrl = props.user?.profile_img || "/public/img/user_icon.jpg"
  
  return (
    <div className={styles.settings}>
      {
        photoToView &&
        <PhotoView 
          list={[imageUrl]} 
          currentIndex={0} 
          close={() => setPhotoToView(false)}
        />
      }
      <h2>Настройки профиля</h2>
      <div className={styles.settings_img}>
        <img 
          src={imageUrl} 
          alt="профиль"
          onClick={handlePhoto}
        />
      </div>

      <form onSubmit={submitHandler} className={styles.settings_form}>
        <div className={styles.settings_form_input}>
          <div className={styles.settings_form_input_names}>
          <label  htmlFor="name">Сменить имя
              <input 
                id="name"
                type="name"
                value={formData.name}
                placeholder='Введите имя'
                onChange={handleValues}
                required
              />
            </label>

            <label  htmlFor="surname">Сменить фамилию
              <input 
                id="surname"
                type="surname"
                value={formData.surname}
                placeholder='Введите фамилию'
                onChange={handleValues}
                required
              />
            </label>
          </div>

          <div className={styles.settings_form_input_description}>
            <label  htmlFor="description">Информация о себе
              <CastomInput 
                minRows='1' maxRows='2'
                placeholder="Введите информацию о себе"
                id="description"
                handleInput={handleValues}
                value={formData.description}
                type="description"
              />
            </label>
          </div>
        </div>

        <div className={`${styles.settings_form_view_info_field} ${styles.settings_form_view_info_mail}`}>
          <p className={styles.settings_form_view_title}>Почта:</p>
          <p className={styles.settings_form_view_mail}>{props.user.email}</p>
          <svg title='Подтвердженна' xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="20px" height="20px" viewBox="0 0 305.002 305.002" xmlSpace="preserve"><g><g><path d="M152.502,0.001C68.412,0.001,0,68.412,0,152.501s68.412,152.5,152.502,152.5c84.089,0,152.5-68.411,152.5-152.5    S236.591,0.001,152.502,0.001z M152.502,280.001C82.197,280.001,25,222.806,25,152.501c0-70.304,57.197-127.5,127.502-127.5    c70.304,0,127.5,57.196,127.5,127.5C280.002,222.806,222.806,280.001,152.502,280.001z"/>
            <path d="M218.473,93.97l-90.546,90.547l-41.398-41.398c-4.882-4.881-12.796-4.881-17.678,0c-4.881,4.882-4.881,12.796,0,17.678    l50.237,50.237c2.441,2.44,5.64,3.661,8.839,3.661c3.199,0,6.398-1.221,8.839-3.661l99.385-99.385    c4.881-4.882,4.881-12.796,0-17.678C231.269,89.089,223.354,89.089,218.473,93.97z"/>
            </g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
          </svg>
        </div>

        <div className={`${styles.settings_form_view_info_field} ${styles.settings_form_view_info_link}`}>
          <p className={styles.settings_form_view_title}>Ссылка на профиль:</p>
          <a href={hrefToProfile}>{linkToProfile}</a>
        </div>

        <div className={styles.settings_form_view_info_field}>
          <p className={styles.settings_form_view_title}>Дата регистрации:</p>
          <p  className={styles.settings_form_view_date}>{`${dateCreate.dateNow} ${dateCreate.timeNow}`}</p>
        </div>

        <button 
          className={styles.settings_submit}
          disabled={validateButton()}
        >{
          props.user.isSettingFetching
          ? 'Подтверждение'
          : 'Подтвердить'
        }</button>
      </form>

    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  setNewSettingsUserAction: (data) => dispatch(setNewSettingsUserAction(data))
})
export default connect(store => ({user: store.user}), mapDispatchToProps)(Settings)
