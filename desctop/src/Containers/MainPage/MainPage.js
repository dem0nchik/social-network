import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import styles from './MainPage.module.css'
import PageAutorize from '../../components/MainPageComponents/PageAutorize/PageAutorize'
import { isAutorizeAction } from '../../actions/autorizeAction'

const MainPage = (props) => {
  useEffect(() => {
    props.isAutorizeAction()
  }, [])

  if (props.autorize.isFetch) { 
    return null;
  } else {
    return (
      <div className={styles.mainPage}>
        { props.autorize.isAutorize 
          ? <>
              <p>Ты авторизирован</p>
            </>
          : <PageAutorize />
        }
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  isAutorizeAction: () => dispatch(isAutorizeAction())
})
export default connect(store => ({autorize: store.autorize}), mapDispatchToProps)(MainPage)