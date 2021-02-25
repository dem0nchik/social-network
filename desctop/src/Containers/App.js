import React, {useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import {connect} from 'react-redux'
import PageAutorize from '../components/AutorizeComponents/PageAutorize/PageAutorize'
import { isAutorizeAction, verifyUserAction } from '../actions/autorizeAction'
import VerifyUser from '../components/AutorizeComponents/VerifyUser/VerifyUser';
import ContentPage from './ContentPage/ContentPage';

const App = (props) => {
  useEffect(() => {
    props.isAutorizeAction()
  }, [])


  const routeBaseUrl = (propsRoute) => {
    return (<>
        { props.autorize.isAutorize 
          ? <ContentPage {...propsRoute} isAutorize={props.autorize.isAutorize}/>
          : <PageAutorize />
        } 
      </>
    )
  }

  if (props.autorize.isFetch) { 
    return null;
  } else {
    return (
      <Router>
        <Switch>
          <Route path="/verify" component={propsRoute => <VerifyUser verifyUserAction={props.verifyUserAction} {...propsRoute} />} /> 
          
          <Route path="/:pageId" component={propsRoute => <ContentPage {...propsRoute} isAutorize={props.autorize.isAutorize}/>} />
          <Route path="/" component={propsRoute => routeBaseUrl(propsRoute)} />

        </Switch>

      </Router>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  isAutorizeAction: () => dispatch(isAutorizeAction()),
  verifyUserAction: (data) => dispatch(verifyUserAction(data))
})
export default connect(store => ({autorize: store.autorize}), mapDispatchToProps)(App)