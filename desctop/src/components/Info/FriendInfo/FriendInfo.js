import React, { useEffect } from 'react'
import styles from './FriendInfo.module.css'

const FriendInfo = (props) => {
  useEffect(() => {
    document.title = 'Иосиф Сталин | xcxlow'
  })
  return (
    <>
    <div className={styles.info__group}>
      <div className={styles.group__wrapper}>
        <div className={styles.group}>
          <h3>Групы 87</h3>

          <div className={styles.wrap_entity}>
            <div className={styles.entity}>
              <img src="/public/img/user_icon.png" alt="group"/>
              <p className={styles.name_entity}>Мастер</p>
            </div>
            <div className={styles.entity}>
              <img src="/public/img/user_icon.png" alt="group"/>
                <p className={styles.name_entity}>Сувениры</p>
            </div>
            <div className={styles.entity}>
              <img src="/public/img/user_icon.png" alt="group"/>
              <p className={styles.name_entity}>История футбола</p>
            </div>
            <div className={styles.entity}>
              <img src="/public/img/user_icon.png" alt="group"/>
              <p className={styles.name_entity}>Игры</p>
            </div>
            <div className={styles.entity}>
              <img src="/public/img/user_icon.png" alt="group"/>
              <p className={styles.name_entity}>Пришельцы Djlyjuj vbhf здесь</p>
            </div>
            <div className={styles.entity}>
              <img src="/public/img/user_icon.png" alt="group"/>
              <p className={styles.name_entity}>Мой город </p>
            </div>
          </div>
          <a href="/view?view=group" className={styles.more}>еще...</a>
        </div>

          <div className={styles.group}>
            <h3>Друзья 91</h3>
            
            <div className={styles.wrap_entity}>
              <div className={styles.entity}>
                <img src="/public/img/B8cmFs_z_400x400.jpg" alt="friend"/>
                <p className={styles.name_entity}>Джека Бут</p>
              </div>
              <div className={styles.entity}>
                <img src="/public/img/user_icon.png" alt="friend"/>
                <p className={styles.name_entity}>Игорь Чакек</p>
              </div>
              <div className={styles.entity}>
                <img src="/public/img/user_icon.png" alt="friend"/>
                <p className={styles.name_entity}>Зоряна Ибрагимовна</p>
              </div>
              <div className={styles.entity}>
                <img src="/public/img/bcg.jpg" alt="friend"/>
                <p className={styles.name_entity}>Артем Кривоножцев</p>
              </div>
              <div className={styles.entity} title='Зина Гордонова'>
                <img src="/public/img/photo607527866119335348.jpg" alt="friend"/>
                <p className={styles.name_entity}>Зина Гордонова</p>
              </div>
              <div className={styles.entity}>
                <img src="/public/img/eJAYFKFJ_400x400.jpg" alt="friend"/>
                <p className={styles.name_entity}>Ина Шарлотка</p>
              </div>
            </div>
            <a href="/view?view=people" className={styles.more}>еще...</a>
        </div>
      </div>


      <div className={styles.additional_info}>

        <a href="/images" className={styles.photos} title='Фотографии'>
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -21 511.98744 511"><path d="m133.320312 373.828125c-34.152343 0-64.53125-21.867187-75.5625-54.421875l-.746093-2.453125c-2.601563-8.621094-3.691407-15.871094-3.691407-23.125v-145.453125l-51.753906 172.757812c-6.65625 25.410157 8.511719 51.753907 33.960938 58.773438l329.878906 88.34375c4.117188 1.066406 8.234375 1.578125 12.289062 1.578125 21.246094 0 40.660157-14.101563 46.101563-34.882813l19.21875-61.117187zm0 0"/><path d="m191.988281 149.828125c23.53125 0 42.664063-19.136719 42.664063-42.667969s-19.132813-42.667968-42.664063-42.667968-42.667969 19.136718-42.667969 42.667968 19.136719 42.667969 42.667969 42.667969zm0 0"/><path d="m458.652344.492188h-320c-29.394532 0-53.332032 23.9375-53.332032 53.335937v234.664063c0 29.398437 23.9375 53.335937 53.332032 53.335937h320c29.398437 0 53.335937-23.9375 53.335937-53.335937v-234.664063c0-29.398437-23.9375-53.335937-53.335937-53.335937zm-320 42.667968h320c5.890625 0 10.667968 4.777344 10.667968 10.667969v151.445313l-67.390624-78.636719c-7.148438-8.382813-17.496094-12.863281-28.609376-13.117188-11.050781.0625-21.417968 4.96875-28.5 13.460938l-79.234374 95.101562-25.8125-25.75c-14.589844-14.589843-38.335938-14.589843-52.90625 0l-58.878907 58.859375v-201.363281c0-5.890625 4.777344-10.667969 10.664063-10.667969zm0 0"/></svg>
          <p>3</p>
        </a>

      </div>
    </div>

    <div className={styles.info__user}>
      <img src="/public/img/79jl6_Nb_400x400.jpg" alt="Фото профиля"/>
      <h3>Иосиф Сталин</h3>

      <div className={styles.button_wrap}>
        <button className={styles.button_add}>Установить связь</button>
        <button>Чат</button>
      </div>
    </div>
  </>
  )
}

export default FriendInfo