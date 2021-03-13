import React, { useState } from 'react'
import CastomInput from '../../accessoryComponents/CastomInput/CastomInput'
import ModalConfirm from '../../accessoryComponents/ModalConfirm/ModalConfirm'
import ImageAtach from './ImageAtach'
import styles from './WallPostAdd.module.css'

const WallPostAdd = (props) => {
  const [valueInput, setValueInput] = useState('')
  const [atachedImage, setAtachedImage] = useState([])
  const [filesToSent, setFilesToSent] = useState([])
  const [showModal, setShowModal] = useState(null)

  const modalCallback = () => {
    setShowModal(null)
  }

  const handleSendData = () => {
    const formData = new FormData()

    if(valueInput.trim()) {
      formData.append('textBody', valueInput.trim())
    }

    if(filesToSent.length) {
      filesToSent.forEach((el, i) => {
        formData.append('file'+i, el.file)
      })
    }
    
    props.addNewPostUserAction(formData)
    setValueInput('')
    setAtachedImage([])
    setFilesToSent([])
  }

  const handleInput = (e) => {
    setValueInput(e.currentTarget.value)
  }

  const deleteImgPostAtach = (id) => {    
    setAtachedImage(pastAtach => {
      const item = pastAtach.filter(el => {
        if(el) { return el.key === id }
      })
      const index = pastAtach.indexOf(item[0])
      let newAtach = pastAtach.slice()

      if (index > -1) {
        newAtach.splice(index, 1)
      }

      return newAtach
    })

    setFilesToSent(pastFiles => {
      const file = pastFiles.filter(el => el.id === +id)
      const index = pastFiles.indexOf(file[0])
      
      let newFiles = pastFiles.slice()

      if (index > -1) {
        newFiles.splice(index, 1)
      }
      return newFiles
    })
  }

  const selectImgPostAtach = (e) => {
    const files = e.currentTarget.files
    let errorMsg = ''
    console.log();

    if (!files[0].type.includes('image')) {
      errorMsg = 'Пожалуйста выберите правильный формат изображения'
    }

    if (atachedImage.length >= 6) {
      errorMsg = 'Вы не можете добавить больше 6 изображений'
    } 

    if(errorMsg) {
      setShowModal(
        <ModalConfirm 
          callback={modalCallback} 
          description={errorMsg}
        />
      )
      return
    }
    
    const imgSrc = window.URL.createObjectURL(files[0])
    const newIdItem = new Date().getTime()

    setAtachedImage(pastAtach => [...pastAtach, (
      <ImageAtach
        key={newIdItem}
        src={imgSrc}
        deleteAtach={deleteImgPostAtach}
        id={newIdItem}
      />)
    ])

    const fileWithId = {file: files[0], id: newIdItem}
    setFilesToSent(pastFiles => [...pastFiles, fileWithId])
  }

  const renderTemplateImgAtach = () => {
    let atachedTemplate = null

    if(atachedImage.length) {
      atachedTemplate = atachedImage.map(item => {
        if(item) { return item }
      })
    }
    return atachedTemplate
  }

  const validate = () => {
    if(valueInput.trim() || atachedImage.length){
        return false
    } else {
        return true
    }
  }
  
  return (
    <div className={styles.post_add}>
        {showModal}

        <div className={styles.post_input_wrap}>
          <CastomInput 
            minRows='2'
            maxRows='6'
            placeholder='Что у вас новенького'
            value={valueInput}
            handleInput={handleInput}
          />
        </div>

        <div className={styles.post_button_wrap}>
          <button 
            className={styles.post_button_sent}
            onClick={handleSendData}
            disabled={validate()}
          >Отправить</button>

          <label className={styles.post_icons_photo} title="Добавить фотографию">
            <input onInput={selectImgPostAtach} title='Картинка профиля' type="file" name="image" />

            <div className={styles.post_add_img_wrap}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -21 511.98744 511"><path d="m133.320312 373.828125c-34.152343 0-64.53125-21.867187-75.5625-54.421875l-.746093-2.453125c-2.601563-8.621094-3.691407-15.871094-3.691407-23.125v-145.453125l-51.753906 172.757812c-6.65625 25.410157 8.511719 51.753907 33.960938 58.773438l329.878906 88.34375c4.117188 1.066406 8.234375 1.578125 12.289062 1.578125 21.246094 0 40.660157-14.101563 46.101563-34.882813l19.21875-61.117187zm0 0"/><path d="m191.988281 149.828125c23.53125 0 42.664063-19.136719 42.664063-42.667969s-19.132813-42.667968-42.664063-42.667968-42.667969 19.136718-42.667969 42.667968 19.136719 42.667969 42.667969 42.667969zm0 0"/><path d="m458.652344.492188h-320c-29.394532 0-53.332032 23.9375-53.332032 53.335937v234.664063c0 29.398437 23.9375 53.335937 53.332032 53.335937h320c29.398437 0 53.335937-23.9375 53.335937-53.335937v-234.664063c0-29.398437-23.9375-53.335937-53.335937-53.335937zm-320 42.667968h320c5.890625 0 10.667968 4.777344 10.667968 10.667969v151.445313l-67.390624-78.636719c-7.148438-8.382813-17.496094-12.863281-28.609376-13.117188-11.050781.0625-21.417968 4.96875-28.5 13.460938l-79.234374 95.101562-25.8125-25.75c-14.589844-14.589843-38.335938-14.589843-52.90625 0l-58.878907 58.859375v-201.363281c0-5.890625 4.777344-10.667969 10.664063-10.667969zm0 0"/></svg>
              <span>фото</span>
            </div>
          </label>          
        </div>
         
        <div 
          className={`${styles.atach_img_wrap} ${atachedImage.length && styles.atach_img_wrap_border}`}>
          {renderTemplateImgAtach()}
        </div>

      </div>
  )
}

export default WallPostAdd