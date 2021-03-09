import React from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import styles from './CastomInput.module.css'
const CastomInput = (props) => {
  const maxRows = props.maxRows || '1'
  const minRows = props.minRows || '1'

  return (
    <TextareaAutosize
      placeholder={props.placeholder || 'Введите текст'} 
      className={styles.input_message} 
      onInput={props.handleInput || null}
      maxRows={maxRows}
      minRows={minRows}
      value={props.value || ''}
      ></TextareaAutosize>
  )
}

export default CastomInput