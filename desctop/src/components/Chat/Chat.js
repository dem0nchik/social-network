import React, { useEffect, useState } from 'react'
import CastomInput from '../accessoryComponents/CastomInput/CastomInput'
import styles from './Chat.module.css'

const Chat = (props) => {
  useEffect(() => {
    document.title = 'Чат | xcxlow'
  })
  
  
  return (
    <div className={styles.chat}>
       <div className={styles.chat_header}>
         <img src="public/img/0ddd8195-16d1-42f8-a000-01e79b4aa5bb.jpg" alt=""/>
         <div className={styles.chat_description}>
          <p className={styles.chat_name}>Иосиф Сталин</p>
          <sub className={styles.chat_status}>online</sub>
        </div>
        <div className={styles.buttons_wrap}>
            <svg className={styles.button_back} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 443.52 443.52"><g><g><path d="M143.492,221.863L336.226,29.129c6.663-6.664,6.663-17.468,0-24.132c-6.665-6.662-17.468-6.662-24.132,0l-204.8,204.8    c-6.662,6.664-6.662,17.468,0,24.132l204.8,204.8c6.78,6.548,17.584,6.36,24.132-0.42c6.387-6.614,6.387-17.099,0-23.712    L143.492,221.863z"/></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
          </div>
      </div>

      <div className={styles.message__wrap}>
      <div className={styles.message_row}>
          <div className={styles.message_interlocutor}>
            <pre>{"Согласен"}</pre>
            <sub className={styles.message_time}>10:20</sub>
          </div>
        </div>
      <div className={styles.message_row}>
          <div className={styles.message_self}>
            <pre>{"Это очень здорово!"}</pre>
            <sub className={styles.message_time}>10:20</sub>
          </div>
        </div>
      <div className={styles.message_row}>
          <div className={styles.message_interlocutor}>
            <pre>{"Тоже неплохо)"}</pre>
            <sub className={styles.message_time}>10:20</sub>
          </div>
        </div>
        <div className={styles.message_row}>
          <div className={styles.message_interlocutor}>
            <pre>{"Согласен"}</pre>
            <sub className={styles.message_time}>10:20</sub>
          </div>
        </div>
      <div className={styles.message_row}>
          <div className={styles.message_self}>
            <pre>{"Это очень здорово!"}</pre>
            <sub className={styles.message_time}>10:20</sub>
          </div>
        </div>
      <div className={styles.message_row}>
          <div className={styles.message_interlocutor}>
            <pre>{"Тоже неплохо)"}</pre>
            <sub className={styles.message_time}>10:20</sub>
          </div>
        </div>
        <div className={styles.message_row}>
          <div className={styles.message_interlocutor}>
            <pre>{"Согласен"}</pre>
            <sub className={styles.message_time}>10:20</sub>
          </div>
        </div>
      <div className={styles.message_row}>
          <div className={styles.message_self}>
            <pre>{"ндемии, уверенности в необходимости продления локдауна больше нет даже у тех, кто до сих пор поддерживал правительственные меры по борьбе с коронавирусом. Так, две трети опрошенных в возрасте до 30 лет заявили, что эти меры их тяготят. Это макси"}</pre>
            <sub className={styles.message_time}>10:20</sub>
          </div>
        </div>
      <div className={styles.message_row}>
          <div className={styles.message_interlocutor}>
            <pre>{"Изрядному испытанию подверглось в последние месяцы и терпение учителей. Многие из них устали находиться в подвешенном состоянии, не зная, к чему им придется готовиться в ближайшие дни: продолжению работы на удаленке, занятиям малыми группами по сменам в школе или возвращению к занятиям в том виде, в каком они проводились до локдауна."}</pre>
            <sub className={styles.message_time}>10:20</sub>
          </div>
        </div>
      <div className={styles.message_row}>
          <div className={styles.message_interlocutor}>
            <pre>{"Пандемия приводит к психическим заболеваниям"}</pre>
            <sub className={styles.message_time}>10:20</sub>
          </div>
        </div>
      <div className={styles.message_row}>
          <div className={styles.message_self}>
            <pre>{"Это очень здорово!"}</pre>
            <sub className={styles.message_time}>10:20</sub>
          </div>
        </div>
      <div className={styles.message_row}>
          <div className={styles.message_interlocutor}>
            <pre>{"Тоже неплохо)"}</pre>
            <sub className={styles.message_time}>10:20</sub>
          </div>
        </div>
        <div className={styles.message_row}>
          <div className={styles.message_self}>
            <pre>{"А твои как?"}</pre>
            <sub className={styles.message_time}>10:20</sub>
          </div>
        </div>
        <div className={styles.message_row}>
          <div className={styles.message_self}>
            <pre>{"Нормуль)"}</pre>
            <sub className={styles.message_time}>10:20</sub>
          </div>
        </div>
        <div className={styles.message_row}>
          <div className={styles.message_interlocutor}>
            <pre>{"Привет!\nКак у тебя дела?"}</pre>
            <sub className={styles.message_time}>10:20</sub>
          </div>
        </div>
      </div>

      <div className={styles.type__message}>
        <div className={styles.message_icons_photo} title="Добавить фотографию" >
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -21 511.98744 511"><path d="m133.320312 373.828125c-34.152343 0-64.53125-21.867187-75.5625-54.421875l-.746093-2.453125c-2.601563-8.621094-3.691407-15.871094-3.691407-23.125v-145.453125l-51.753906 172.757812c-6.65625 25.410157 8.511719 51.753907 33.960938 58.773438l329.878906 88.34375c4.117188 1.066406 8.234375 1.578125 12.289062 1.578125 21.246094 0 40.660157-14.101563 46.101563-34.882813l19.21875-61.117187zm0 0"/><path d="m191.988281 149.828125c23.53125 0 42.664063-19.136719 42.664063-42.667969s-19.132813-42.667968-42.664063-42.667968-42.667969 19.136718-42.667969 42.667968 19.136719 42.667969 42.667969 42.667969zm0 0"/><path d="m458.652344.492188h-320c-29.394532 0-53.332032 23.9375-53.332032 53.335937v234.664063c0 29.398437 23.9375 53.335937 53.332032 53.335937h320c29.398437 0 53.335937-23.9375 53.335937-53.335937v-234.664063c0-29.398437-23.9375-53.335937-53.335937-53.335937zm-320 42.667968h320c5.890625 0 10.667968 4.777344 10.667968 10.667969v151.445313l-67.390624-78.636719c-7.148438-8.382813-17.496094-12.863281-28.609376-13.117188-11.050781.0625-21.417968 4.96875-28.5 13.460938l-79.234374 95.101562-25.8125-25.75c-14.589844-14.589843-38.335938-14.589843-52.90625 0l-58.878907 58.859375v-201.363281c0-5.890625 4.777344-10.667969 10.664063-10.667969zm0 0"/></svg>
        </div>

        <div className={styles.input_wrap}>
          <CastomInput placeholder="Введите сообщение"/>
        </div>
        <div  className={styles.message_icons_sent} title="Отправить сообщение">
          <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 511.398 511.398"><path d="m511.398 255.699-511.066-239.318 27.662 197.326-27.994 41.992 27.994 41.991-27.662 197.327zm-456.477-28.298 139.602 28.298-139.602 28.298-18.865-28.298zm385.736 28.298-402.933 188.682 18.222-129.982 289.587-58.7-289.587-58.7-18.222-129.982z"/></svg>
        </div>
      </div>
  </div>
  )
}

export default Chat