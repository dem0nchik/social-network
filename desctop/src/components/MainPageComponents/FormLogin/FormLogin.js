import React, {useState} from 'react'
import styles from './FormLogin.module.css'

const FormLogin = (props) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const submitHandler = (e) => {
    e.preventDefault()
    props.loginUserAction(formData)
  }

  const handleValues = (e) => {
    const {id, value} = e.currentTarget
    setFormData({...formData, [id]: value});
  }

  const handleToggleForm = (e) => {
    e.preventDefault()
    props.toggleForm(e.currentTarget.id)
  }

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <h2>Вход</h2>
      <p >Войдите в учетную запись</p>

      <div className={styles.input__wrapper}>
      <label htmlFor="email">Почта
          <input 
            id="email"
            type="email"
            value={formData.email}
            placeholder='Введите почту'
            onChange={handleValues}
            required
          />
        </label>

        <label htmlFor="password">Пароль
          <input 
            id="password"
            type="password"
            value={formData.password}
            placeholder='Введите пароль'
            onChange={handleValues}
            required
          />
        </label>
      </div>

      <div className={styles.buttons__wrapper}>
          <button className={styles.button__login} title='Войти'>Войти</button>
        <div className={styles.login_wrap}>
          <button className={styles.button__reset} title='Восстановить пароль'>забыли пароль?</button>
          <button onClick={handleToggleForm} className={styles.button__reg} id='registration' title='Регистрация'>Регистрация</button>
        </div>
      </div>
    </form>
  )
}

export default FormLogin