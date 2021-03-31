const ROUTING = 'ROUTING'

export const redirect = store => next => action => { 
  if (action.type === ROUTING) {
    
    window.location.href = action.payload.nextUrl
  }

  return next(action)
}