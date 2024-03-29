import React, { useEffect } from 'react'
import Header from '../../components/Header/Header'
import Feed from '../../components/WallComponents/Feed/Feed'
import Widgets from '../../components/Widgets/Widgets'
import styles from './ContentPage.module.css'
import Info from '../../components/Info/Info'
import Wall from '../../components/WallComponents/Wall'
import Chat from '../../components/Chat/Chat'
import ViewEntity from '../../components/ViewEntity/ViewEntity'
import { userDataAction } from '../../actions/userAction'
import { connect } from 'react-redux'
import Settings from '../../components/Settings/Settings'

const ContentPage = (props) => {

  useEffect(() => {
    if (props.isAutorize && !props.user.isReceive) {
      props.userDataAction()
    }
  }, [])

  const hasLocation = (testingArr, locationPath) => {
    return testingArr.some(el => locationPath.startsWith(el));
  }
  

  const switchInfoComponent = () => {
    if (props.isAutorize) {
      if ( hasLocation(['/id', '/group'], props.location.pathname) && !props.user.isUserDataFetching ) {
        return <Info 
              pathname={props.location.pathname} 
              isAutorize={props.isAutorize}
              userData={props.user}
            />
      }
    } else {
      if ( hasLocation(['/id', '/group'], props.location.pathname) ) {
        return <Info 
              pathname={props.location.pathname} 
              isAutorize={props.isAutorize}
              userData={props.user}
              addNewProfileImgAction={props.addNewProfileImgAction}
              deleteProfileImgAction={props.deleteProfileImgAction}
            />
      }
    }
    
    return null
  }

  const switchComponentLocation = () => {
    if (props.isAutorize) {
      if (props.location.pathname === '/') {
        return <Feed /> 
      }
      if (hasLocation(['/view', '/friend'], props.location.pathname)) {
        return <ViewEntity 
          pathname={props.location.pathname}
          location={props.location}
        /> 
      }
      if (hasLocation(['/chat'], props.location.pathname)) {
        return <Chat pathname={props.location.pathname}/>
      }
      if (hasLocation(['/settings'], props.location.pathname)) {
        return <Settings 
          userData={props.user}
        />
      } 
    }
    if (hasLocation(['/id', '/group'], props.location.pathname)) {
      return <Wall 
          pathname={props.location.pathname}
          isAutorize={props.isAutorize}
          userData={props.user}
        />
    }
    if (!props.isAutorize) {
      return <h2 style={{width: '665px'}}>Вы не авторизированы</h2>
    }  
    return <h2 style={{width: '665px'}}>404 Not found</h2>
  }

  return (
    <>
      <Header isAutorize={props.isAutorize} userData={props.user}/>
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

const mapDispatchToProps = dispatch => ({
  userDataAction: () => dispatch(userDataAction())
})
export default connect(store => ({user: store.user}), mapDispatchToProps)(ContentPage)