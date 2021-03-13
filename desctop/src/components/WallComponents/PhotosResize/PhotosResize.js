import React  from 'react'
import styles from './PhotoResize.module.css'

const PhotoResize = (props) => {
  if(!props.images) return null
  

  const resize = () => {
    switch (props.images.length) {
      case 1:
        return <img 
          src={props.images[0]} 
          alt='img' 
          style={{maxWidth:'635px'}}
          onClick={() => props.handlePhoto('0')}
        />    
      case 2:
        return props.images.map((img, i) => {
          return <img 
            key={i}  src={img} 
            alt='img' width ='315px'
            onClick={() => props.handlePhoto(i)}
          />
        })
      case 3:
        return props.images.map((img, i) => {
          if(i === 2) {
            return <img 
              key={i} src={img} alt='img1' 
              style={{maxWidth:'635px'}}
              onClick={() => props.handlePhoto(i)}
            />
          }
          return <img 
            key={i}  src={img} 
            alt='img2'  width ='315px'
            onClick={() => props.handlePhoto(i)}
          />
        })    
      case 4:
        return props.images.map((img, i) => {
          return <img 
            key={i}  src={img} 
            alt='img' width ='315px'
            onClick={() => props.handlePhoto(i)}
          />
        })  
      case 5:
        return props.images.map((img, i) => {
          if(i >= 2) {
            return <img 
              key={i} src={img} 
              alt='img1' width ='205px'
              onClick={() => props.handlePhoto(i)}
            />
          }
          return <img 
            key={i} src={img} 
            alt='img2' width ='315px'
            onClick={() => props.handlePhoto(i)}
          />
        })  
      case 6:
        return props.images.map((img, i) => {
          return <img 
            key={i} src={img} 
            alt='img' width ='205px'
            onClick={() => props.handlePhoto(i)}
          />
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