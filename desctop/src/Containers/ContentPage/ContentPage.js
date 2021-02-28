import React from 'react'
import Header from '../../components/Header/Header'
import Feed from '../../components/WallComponents/Feed/Feed'
import Widgets from '../../components/Widgets/Widgets'
import styles from './ContentPage.module.css'
import Info from '../../components/Info/Info'
import Wall from '../../components/WallComponents/Wall'
import Chat from '../../components/Chat/Chat'
import ViewEntity from '../../components/ViewEntity/ViewEntity'

const ContentPage = (props) => {

  const hasLocation = (testingArr, locationPath) => {
    return testingArr.some(el => locationPath.includes(el));
  }

  const switchInfoComponent = () => {
    if (hasLocation(['/id', '/group'], props.location.pathname)) {
      return <Info pathname={props.location.pathname} isAutorize={props.isAutorize}/>
    }
    return <></>
  }

  const switchComponentLocation = () => {
    if (props.isAutorize) {

      if (props.location.pathname === '/') {
        return <Feed /> 
      }
      if (props.location.pathname === '/view') {
        return <ViewEntity /> 
      }
      if (hasLocation(['/chat'], props.location.pathname)) {
        return <Chat />
      }

    }

    if (hasLocation(['/id', '/group'], props.location.pathname)) {
      return <Wall pathname={props.location.pathname} isAutorize={props.isAutorize}/>
    }
    if (!props.isAutorize) {
      return <h2 style={{width: '665px'}}>Вы не авторизированы</h2>
    }
    return <>404 Not found.</>
  }

  return (
    <>
      <Header isAutorize={props.isAutorize}/>
      <div className={styles.main__wrap}>
        <main className={styles.content}>
          {switchInfoComponent()}
          
          <div className={styles.content__wrap}>
            {switchComponentLocation()}
            <Widgets isAutorize={props.isAutorize}/>
          </div>
        </main>
      </div>
    </>
  )
}

export default ContentPage