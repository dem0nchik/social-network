import React from 'react'
import style from '../Info.module.css'
const DescriptionUser = (props) => {
  return (
    <>
      {
      props.desc &&
      <div className={style.description}>
        <p className={style.description_title}>Информация обо мне</p>
        <p>{props.desc}</p>
      </div>
      }
    </>
  )
}

export default DescriptionUser
