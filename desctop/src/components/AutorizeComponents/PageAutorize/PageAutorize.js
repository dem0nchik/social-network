import React, {useEffect, useState} from 'react'
import styles from './PageAutorize.module.css'
import FormRegistaration from '../FormRegistaration/FormRegistaration'
import FormLogin from '../FormLogin/FormLogin'
import { loginUserAction, registrationUserAction } from '../../../actions/autorizeAction'
import { connect } from 'react-redux'
import ModalConfirm from '../../ModalConfirm/ModalConfirm'

const hashtags = [
  'Создавай',
  'Практикуй',
  'Люби',
  'Планируй',
  'Хвали',
  'Твори',
  'Помогай',
  'Улыбайся',
  'Строй',
  'Учись',
  'Мотивируй',
  'Пытайся',
  'Закаляйся',
  'Прагни',
  'Жди',
  'Начинай',
  'Мечтай',
  'Действуй',
  'Награждай'
]

const PageAutorize = (props) => {
  const [toggleForm, setToggleForm] = useState('login')
  const [toggleModal, setTogglemModal] = useState(false)
  const [messageModal, setMessageModal] = useState('')
  const [readingModal, setReadingModal] = useState(false)


  useEffect(() => {
    if (props.autorize.registerStatus && !readingModal) {
      setMessageModal(`Вы успешно зарегистрировались\n Пожалуйста подтвердите ваш Email,\nПисьмо с подтверждением отправлено на вашу почту`)
      setTogglemModal(true)
    }

    if (props.autorize.verifyUser && !readingModal) {
      setMessageModal(`Ваша почта успешно подтвержденная ✅\nВвойдите в свой профиль`)
      setTogglemModal(true)
    }
  });
  

  const handleToggleForm = (formName) => {
    setToggleForm(formName)
  }

  const createHashtags = (hashtags = []) => {
    return hashtags.map((el, i) => {
      return <a key={i} href='#'>#{el}</a>
    })
  }
  const modalCallback = e => {
    e.preventDefault()
    setTogglemModal(false)
    setToggleForm('login')
    setReadingModal(true)
  }
  return (
    <div className={styles.autorize}>
      <div className={styles.leftBlock}>
        <p className={styles.logo} title={'xcxlow'}>XCXLOW</p>
        <p className={styles.description}>Социальная Сеть :)</p>
        <div className={styles.hashes_wrap}>
          {createHashtags(hashtags)}
        </div>
      </div>
      <div className={styles.content}>
        {toggleForm === 'login'
          ? <FormLogin
              toggleForm={handleToggleForm}
              loginUserAction={props.loginUserAction}
              fields={props.autorize.fieldsIssues}
              message={props.autorize.message}
            />
          : <FormRegistaration
              toggleForm={handleToggleForm}
              fields={props.autorize.fieldsIssues}
              message={props.autorize.message}
              registrationUserAction={props.registrationUserAction}
            />
        }
        {toggleModal && <ModalConfirm callback={modalCallback} description={messageModal}/>}
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  registrationUserAction: data => dispatch(registrationUserAction(data)),
  loginUserAction: data => dispatch(loginUserAction(data))
})

export default connect(store => ({autorize: store.autorize}), mapDispatchToProps)(PageAutorize)