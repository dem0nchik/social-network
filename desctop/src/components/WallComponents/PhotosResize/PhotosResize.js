import React  from 'react'
import styles from './PhotoResize.module.css'

const PhotoResize = (props) => {
  if(!props.images) return null
  

  const resize = () => {
    switch (props.images.length) {
      case 1:
        return <img src={props.images[0]} alt='img' style={{maxWidth:'635px'}}/>    
      case 2:
        return props.images.map((img, i) => {
          return <img key={i} src={img} alt='img' style={{width:'315px'}}/>
        })
      case 3:
        return props.images.map((img, i) => {
          if(i === 2) {
            return <img key={i} src={img} alt='img' style={{maxWidth:'635px'}}/>
          }
          return <img key={i} src={img} alt='img' style={{width:'315px'}}/>
        })    
      case 4:
        return props.images.map((img, i) => {
          return <img key={i} src={img} alt='img'  style={{width:'315px'}}/>
        })  
      case 5:
        return props.images.map((img, i) => {
          if(i >= 2) {
            return <img key={i} src={img} alt='img' style={{width:'205px'}}/>
          }
          return <img key={i} src={img} alt='img' style={{width:'315px'}}/>
        })  
      case 6:
        return props.images.map((img, i) => {
          return <img key={i} src={img} alt='img' style={{width:'205px'}}/>
        })    
      default:
        break;
    }
  }
  return (
    <div className={styles.post_images}>
      {resize()}
    </div>
  )
}

export default PhotoResize