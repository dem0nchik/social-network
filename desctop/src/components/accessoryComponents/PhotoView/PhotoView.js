import React, {useEffect} from 'react'
import styles from './PhotoView.module.css'

const PhotoView = (props) => {
  const [currentImage, setCurrentImage] = React.useState('')
  const [currentIndex, setCurrentIndex] = React.useState(0)

  useEffect(() => {
    if (props.list && Number.isInteger(+props.currentIndex)) {
      setCurrentImage(props.list[props.currentIndex])
      setCurrentIndex(+props.currentIndex)
    }
  }, [])

  const handleArrowLeft = e => {
    if(+currentIndex === 0) {
      setCurrentImage(props.list[props.list.length-1]);
      setCurrentIndex(props.list.length-1)
    } else {
      setCurrentImage(props.list[currentIndex - 1]);
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleArrowRight = e => {
    if(currentIndex === props.list.length-1) {
      setCurrentImage(props.list[0]);
      setCurrentIndex(0)
    } else {
      setCurrentIndex(currentIndex + 1)
      setCurrentImage(props.list[currentIndex + 1]);
    }
  }

  const handleClose = (e) => {
    props.close()
  }
  console.log(currentIndex);
  return (
    <div className={styles.photoview}>
      <div className={styles.overlay} onClick={handleClose}></div>

      <div className={styles.photoview_wrap}>
        <p className={styles.close} onClick={handleClose}>X</p>

        <div className={styles.photo_wrap}>
          <div 
            className={styles.image_arrow_left}
            onClick={handleArrowLeft}
          ></div>
          <div 
            className={styles.image_arrow_right}
            onClick={handleArrowRight}            
          ></div>

          <div className={styles.main_image_wrap}>
            <img src={currentImage} alt=""/>
          </div>

          <div className={styles.count_images}>
            <p>{`${currentIndex+1} из ${props.list.length}`}</p>
          </div>
        </div>          
      </div>
     
    </div>
  )
}

export default PhotoView
