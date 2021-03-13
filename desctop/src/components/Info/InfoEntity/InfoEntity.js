import React from 'react'
import Entity from './Entity'
import styles from './InfoEntity.module.css'

const InfoEntity = (props) => {

  const renderTemplateEntity = () => {
    let template = null
    
    if(props.data?.length) {
      template = props.data.map((entity,i) => {
        return <Entity key={i} data={entity}/>
      })
    }
    return template
  }

  const whatEntity = {
    group: 'group',
    friend: 'friend'
  }

  const haveNoEntity = () =>{
    if (props.whatEntity === whatEntity.group) {
      return <h4 className={styles.entity_no}>Пока здесь групп нет</h4>
    } else if (props.whatEntity === whatEntity.friend) {
      return <h4 className={styles.entity_no}>Пока здесь друзей нет</h4>
    }
  }

  const linkToView = () =>{
    if (props.whatEntity === whatEntity.group) {
      return `/view?view=group&userId=${props.userId}`
    } else if (props.whatEntity === whatEntity.friend) {
      return props.isUserProfile ? '/friend' : `/view?view=friend&userId=${props.userId}`
    }
  }

  const buttonAdding = () =>{
    if (props.whatEntity === whatEntity.group) {
      return <>
        <div className={`${styles.button_wrap} ${styles.button_add}`}>
          <button>Добавить групу</button>
        </div>
        <a href="/group/create" className={styles.create_link}>создать новую</a>
      </>
    } else if (props.whatEntity === whatEntity.friend) {
      return <>
        <div className={`${styles.button_wrap} ${styles.button_add}`}>
          <button>Добавить Друзей</button>
        </div>
      </>
    }
  }

  const titleReturn = () =>{
    if (props.whatEntity === whatEntity.group) {
      return `Групп ${props.data.length}`
    } else if (props.whatEntity === whatEntity.friend) {
      return `Друзей ${props.data.length}`
    }
  }
  
  return (
        <div className={styles.group}>
          <h3>{titleReturn()}</h3>

          <div className={styles.wrap_entity}>
            {renderTemplateEntity()}
          </div>
          {
            !props.data?.length && !props.isUserProfile && haveNoEntity()
          }
          {
            !props.data?.length && props.isUserProfile && buttonAdding()
          }
          {
            (props.data?.length >= 6 && props.isAutorize) 
            ? <a href={linkToView()} className={styles.more}>еще...</a>
            : null
          }
        </div>
  )
}

export default InfoEntity