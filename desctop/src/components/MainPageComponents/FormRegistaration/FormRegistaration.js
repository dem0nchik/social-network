import React, {useState} from 'react'
import styles from './FormRegistaration.module.css'

const FormRegistaration = (props) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password_apply: '',
    name: '',
    surname: ''
  })

  const handleValues = (e) => {
    const {id, value} = e.currentTarget
    setFormData({...formData, [id]: value});
  }

  const submitHandler = (e) => {
    e.preventDefault()
    props.registrationUserAction(formData)
  }

  const handleToggleForm = (e) => {
    e.preventDefault()
    props.toggleForm(e.currentTarget.id)
  }
  const setIssuesFieldStyle = (nameField) => {
    return props.fields.includes(nameField) ? styles.fieldsIssues : ''
  }
  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <h2>Регистрация</h2>
      <p >Создайте учетную запись</p>

      <div className={styles.input__wrapper}>
        <label className={setIssuesFieldStyle('email')} htmlFor="email">Почта
          <input 
            id="email"
            type="email"
            value={formData.email}
            placeholder='Введите почту'
            onChange={handleValues}
            required
          />
        </label>

        <label className={setIssuesFieldStyle('password')} htmlFor="password">Пароль
          <input 
            id="password"
            type="password"
            value={formData.password}
            placeholder='Введите пароль'
            onChange={handleValues}
            required
          />
        </label>

        <label className={setIssuesFieldStyle('password_apply')} htmlFor="password_apply">Подтверждение пароля
          <input
            id="password_apply"
            type="password"
            value={formData.password_apply}
            placeholder='Повторите пароль'
            onChange={handleValues}
            required
          />
        </label>

        <label className={setIssuesFieldStyle('name')} htmlFor="name">Имя
          <input
            id="name"
            type="text"
            value={formData.name}
            placeholder='Введите имя'
            onChange={handleValues}
            required
          />
        </label>

        <label className={setIssuesFieldStyle('surname')} htmlFor="surname" title='Опционально'>Фамилия
          <input 
            id="surname"
            type="text"
            value={formData.surname}
            placeholder='Введите фамилию'
            onChange={handleValues}
          />
        </label>
      </div>

      <div className={styles.buttons__wrapper}>
        { props.message && <p className={styles.message}>{props.message}</p> }
        <button className={styles.button__reg} title='Регистрация'>Регистрация</button>
        <button onClick={handleToggleForm} id='login' className={styles.button__login} title='Войти'>Войти</button>
      </div>
    </form>
  )
}

export default FormRegistaration