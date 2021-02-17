import React, {useEffect} from 'react'
import {Redirect} from 'react-router-dom'
const queryString = require('query-string');

const VerifyUser = (props) => {
  useEffect(() => {
    const parsed = queryString.parse(props.location.search)
    props.verifyUserAction(parsed.idToken)
  }, []);
  return <Redirect to='/'/>
}

export default VerifyUser