import React, { useEffect } from 'react'
import CastomInput from '../accessoryComponents/CastomInput/CastomInput'
import styles from './Wall.module.css'
import WallPost from './WallPost/WallPost'

const Wall = (props) => {

  // const templateWallRender = () => {
  //   if (props.pathname.includes('/group')) {
  //     return <WallGroup />
  //   }
  //   if (props.pathname.includes('/id')) {
  //     return <WallProfile />
  //   }
  //   return <></>
  // }
  
  const postData = {
    images: ["public/img/1000x563_305345.jpg","public/img/53f2391269bedd4e4d1c5fb8.jpg","public/img/1000x563_305345.jpg", "public/img/53f2391269bedd4e4d1c5fb8.jpg"],
    bodyText: 'Здравствуйте товарищи, это Сталин!\nВсе мои замечания я буду оставлять здесь.',
    profileImg: 'public/img/0ddd8195-16d1-42f8-a000-01e79b4aa5bb.jpg',
    name: 'Иосиф Сталин',
    date: '2021.02.23',
    heartCount: 32,
    commentData: [
      {
        profileImg: 'public/img/B8cmFs_z_400x400.jpg',
        bodyText: `I am just a simple Russian girl,\nI've got vodka in my blood,\nSo I dance with brown bears,\nAnd my soul is torn apart`,
        name: 'Зина Корзина',
        date: '2021.02.24',
      },
      {
        profileImg: 'public/img/kQkS4bYGF3A.jpg',
        bodyText: `Последнее время слушаю оливера три`,
        name: 'Ана Убрана',
        date: '2021.02.24',
      }
    ]
  }
  const postData2 = {
    images: [],
    bodyText: 'Приветикик!\nШо как по чем???',
    profileImg: 'public/img/user_icon.png',
    name: 'Гриша Горин',
    date: '2021.02.24',
    heartCount: 0,
    commentData: []
  }

  const dataPost = [postData, postData2]

  const templateWallPost = () => {
    return dataPost.map((data,i) => {
      return <WallPost key={i} data={data}/>
    })
  }

  return (
    <div className={styles.wall}>
      <div className={styles.post_add}>
        <div className={styles.post_input_wrap}>
          <CastomInput minHeight='30px' placeholder='Что у вас новенького'/>
        </div>

        <div className={styles.post_button_wrap}>
          <button className={styles.post_button_sent}>Отправить</button>

          <div className={styles.post_icons_photo} title="Добавить фотографию" >
            <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -21 511.98744 511"><path d="m133.320312 373.828125c-34.152343 0-64.53125-21.867187-75.5625-54.421875l-.746093-2.453125c-2.601563-8.621094-3.691407-15.871094-3.691407-23.125v-145.453125l-51.753906 172.757812c-6.65625 25.410157 8.511719 51.753907 33.960938 58.773438l329.878906 88.34375c4.117188 1.066406 8.234375 1.578125 12.289062 1.578125 21.246094 0 40.660157-14.101563 46.101563-34.882813l19.21875-61.117187zm0 0"/><path d="m191.988281 149.828125c23.53125 0 42.664063-19.136719 42.664063-42.667969s-19.132813-42.667968-42.664063-42.667968-42.667969 19.136718-42.667969 42.667968 19.136719 42.667969 42.667969 42.667969zm0 0"/><path d="m458.652344.492188h-320c-29.394532 0-53.332032 23.9375-53.332032 53.335937v234.664063c0 29.398437 23.9375 53.335937 53.332032 53.335937h320c29.398437 0 53.335937-23.9375 53.335937-53.335937v-234.664063c0-29.398437-23.9375-53.335937-53.335937-53.335937zm-320 42.667968h320c5.890625 0 10.667968 4.777344 10.667968 10.667969v151.445313l-67.390624-78.636719c-7.148438-8.382813-17.496094-12.863281-28.609376-13.117188-11.050781.0625-21.417968 4.96875-28.5 13.460938l-79.234374 95.101562-25.8125-25.75c-14.589844-14.589843-38.335938-14.589843-52.90625 0l-58.878907 58.859375v-201.363281c0-5.890625 4.777344-10.667969 10.664063-10.667969zm0 0"/></svg>
          </div>
        </div>
      </div>

      { true && templateWallPost() }
    </div>
  )
}

export default Wall