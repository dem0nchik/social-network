import { io } from "socket.io-client";
import config from '../config'

const socket = io(config.API_URL, {
  withCredentials: true,
  autoConnect: 20000
})


export default socket
