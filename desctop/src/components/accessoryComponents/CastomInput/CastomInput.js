import React, { useEffect, useRef } from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import styles from './CastomInput.module.css'
const CastomInput = (props) => {
  const inputRef = useRef(null)

  useEffect(() => {
    props.setFocus && inputRef.current.focus()
  }, [])

  const maxRows = props.maxRows || '1'
  const minRows = props.minRows || '1'
  const handleInput = props.handleInput ? props.handleInput : () => {}

  return (
    <TextareaAutosize
      id={props.id || ''}
      placeholder={props.placeholder || 'Введите текст'} 
      className={styles.input_message} 
      onChange={handleInput}
      maxRows={maxRows}
      minRows={minRows}
      value={props.value || ''}
      ref={inputRef}
      ></TextareaAutosize>
  )
}

export default CastomInput