import React, {useState} from 'react'
import styles from './CastomInput.module.css'
const CastomInput = (props) => {
  const minHeight = props.minHeight || '0px'
  
  return (
    <div 
      dataplaceholder={props.placeholder || 'Введите текст'} 
      className={styles.input_message} 
      onInput={props.handleInput ? props.handleInput : null} 
      contentEditable="true"
      style={{minHeight: minHeight}}></div>
  )
}

export default CastomInput