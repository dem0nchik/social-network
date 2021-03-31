import {useState, useRef} from 'react'

export default function useTyping(initialHandleTyping) {  
  const [handleTyping, setHandleTyping] = useState(initialHandleTyping)
  const timeoutTypingRef = useRef(null)

  const timeoutFunction = (socket, chatId) => {
    setHandleTyping(false)
    socket.emit('MESSAGE:TYPING', {isTyping: false, chatId})
  }

  const setTyping = (socket, handleTyping, timeoutTypingRef, chatId) => {
    if (handleTyping === false) {
      setHandleTyping(true)
      socket.emit('MESSAGE:TYPING', {isTyping: true, chatId})
      timeoutTypingRef.current = setTimeout(() => timeoutFunction(socket, chatId), 3000)
    } else {
      clearTimeout(timeoutTypingRef.current)  
      timeoutTypingRef.current = setTimeout(() => timeoutFunction(socket, chatId), 3000)
    }
  }
  return {
    handleTyping,
    timeoutTypingRef,
    setTyping
  }
}
