import React from 'react'
import Entity from '../Entity/Entity'
import styles from '../ViewEntity.module.css'

const ViewFriends = (props) => {

  const renderTemplateEntity = () => {
    let template = null

    if (!!props.data?.length) {
      template = props.data.map((el, i) => {
        return <Entity
          key={i}
          profileImg={el.profileImg || ''}
          name={el.name}
          link={el.link || ''}
          showButtonAdd={false}
        />
      })
    }

    return template
  }

  return (
    <>
      {
        !!props.data?.length
          ? renderTemplateEntity()
          : <p className={styles.entity_nothing}>Друзей в данный момент нет</p>
      }
    </>
  )
}

export default ViewFriends