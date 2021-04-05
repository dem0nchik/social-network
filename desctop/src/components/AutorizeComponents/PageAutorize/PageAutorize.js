import React, {useEffect, useState} from 'react'
import styles from './PageAutorize.module.css'
import FormRegistaration from '../FormRegistaration/FormRegistaration'
import FormLogin from '../FormLogin/FormLogin'
import { loginUserAction, readingModalAction, registrationUserAction, setToggleFormAction, viewMessageVerifyAction } from '../../../actions/autorizeAction'
import { connect } from 'react-redux'
import ModalConfirm from '../../accessoryComponents/ModalConfirm/ModalConfirm'


const PageAutorize = (props) => {
  const [toggleModal, setTogglemModal] = useState(false)
  const [messageModal, setMessageModal] = useState('')

  useEffect(() => {

    if (props.autorize.registerStatus && !props.autorize.readingModal) {
      setMessageModal(`Вы успешно зарегистрировались\n Пожалуйста подтвердите ваш Email,\nПисьмо с подтверждением отправлено на вашу почту`)
      setTogglemModal(true)
    }
    if (props.autorize.verifyUser && !props.autorize.readingModal) {
      setMessageModal(`Ваша почта успешно подтвержденная ✅\nВвойдите в свой профиль`)
      setTogglemModal(true)
    }
  });
  
  const handleToggleForm = (formName) => {
    props.setToggleFormAction(formName)
    props.viewMessageVerifyAction()
  }

  const modalCallback = e => {
    e.preventDefault()
    setTogglemModal(false)
    props.setToggleFormAction('login')
    props.readingModalAction(true)
  }
  return (
    <div className={styles.autorize}>
      <header className={styles.autorize_header}>
        <div className={styles.logo_wrap}>
          <a href="/"><h1 className={styles.logo} title={'xcxlow'}>XCXLOW</h1></a>
          <p className={styles.description}>Социальная Сеть</p>
        </div>
        <p className={styles.welcome}>Добро пожаловать в сообщество xcxlow! 👻</p>
      </header>
      <div className={styles.content}>
        {props.autorize.formName === 'login'
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

        <div className={styles.about}>
          <img src="/public/img/phone.png" alt=""/>
          <p>Социальная сеть для общения</p>
          <p>Делись каждыми моментами со своими друзьями</p>
          <p>Узнавай что-то новое</p>
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  registrationUserAction: data => dispatch(registrationUserAction(data)),
  loginUserAction: data => dispatch(loginUserAction(data)),
  viewMessageVerifyAction: () => dispatch(viewMessageVerifyAction()),
  setToggleFormAction: (formName) => dispatch(setToggleFormAction(formName)),
  readingModalAction: (flag) => dispatch(readingModalAction(flag))
})

export default connect(store => ({autorize: store.autorize}), mapDispatchToProps)(PageAutorize)