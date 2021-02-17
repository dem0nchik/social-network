import React, {useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {connect} from 'react-redux'
import styles from './MainPage.module.css'
import PageAutorize from '../../components/AutorizeComponents/PageAutorize/PageAutorize'
import { isAutorizeAction, verifyUserAction } from '../../actions/autorizeAction'
import VerifyUser from '../../components/AutorizeComponents/VerifyUser/VerifyUser';
import ContentPage from '../ContentPage/ContentPage';

const MainPage = (props) => {
  useEffect(() => {
    props.isAutorizeAction()
  }, [])

  if (props.autorize.isFetch) { 
    return null;
  } else {
    return (
      <Router>
        <Switch>
          <Route path="/" exact>
            <div className={styles.mainPage}>
              { props.autorize.isAutorize 
                ? <ContentPage />
                : <PageAutorize />
              }
            </div>
          </Route>

          <Route path="/verify" component={propsRoute => <VerifyUser verifyUserAction={props.verifyUserAction} {...propsRoute} />} /> 
        </Switch>

      </Router>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  isAutorizeAction: () => dispatch(isAutorizeAction()),
  verifyUserAction: (data) => dispatch(verifyUserAction(data))
})
export default connect(store => ({autorize: store.autorize}), mapDispatchToProps)(MainPage)