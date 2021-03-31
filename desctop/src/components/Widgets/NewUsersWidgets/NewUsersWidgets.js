import React from 'react'
import WidgetEntity from '../WidgetEntity/WidgetEntity'
import styles from '../Widgets.module.css'

const NewUsersWidgets = (props) => {
  React.useEffect(() => {
    props.getListLastUsersAction()
  }, [])


  const nameEntity = (name) => {
    if (name) {
      return name.length > 25 ? name.substr(0, 27) : name
    } else {
      return ''
    }
  }
  
  const renderTemplateEntity = () => {
    let template = null

    if (!!props.data?.length) {
      template = props.data.map((el, i) => {
        return <WidgetEntity 
          key={i}
          name={nameEntity(el.name)}
          profileImg={el.profileImg || ''}
          link={el.link || ''}
        />
      })
    }

    return template
  }
  
  return (
    <div className={styles.users}>
      <a className={styles.title} href="/view?user=new"><h3>Новые Пользователи</h3></a>
      <p className={styles.description}>последние 10</p>

      <div className={styles.entity__wrap}>
        {
          !!props.data?.length
           ? renderTemplateEntity()
           : <p className={styles.entity_nothing}>Пользователей нет</p>
        }
      </div>
    </div>
  )
}

export default NewUsersWidgets