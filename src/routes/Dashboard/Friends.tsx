// Copyright © 2024 Navarrotech

import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faUserGroup } from '@fortawesome/free-solid-svg-icons'
import { useRealtimeDatabase, useUser } from '@/modules/firebase/hooks'

import styles from './Dashboard.module.sass'

export function FriendsList() {
  const user = useUser()
  const friends = useRealtimeDatabase('user/' + user?.uid + '/friends')

  const [ state, setState, ] = useState({
    friends: [{
      username: 'Alex Navarro',
      photoURL: 'https://lh3.googleusercontent.com/a-/AFdZucqCeVtwa2SaFFasbdIciOk840rZpYuBwP2OUqVm=s96-c',
      online: true,
    },],
    addFriendModal: false,
  })

  if (friends === undefined) {
    return <div></div>
  }

  return (
    <div className={styles.Friendslist}>
      <div className="block level">
        <div className="icon-text is-size-4">
          <span className="icon mr-3">
            <FontAwesomeIcon icon={faUserGroup} />
          </span>
          <span>Friends</span>
        </div>
        <div className="block buttons is-right">
          <button
            className="button is-primary is-rounded"
            type="button"
            onClick={() => {
              setState({ addFriendModal: true, })
            }}
          >
            <span className="icon">
              <FontAwesomeIcon icon={faPlus} />
            </span>
          </button>
        </div>
      </div>
      <div className={styles.friends}>
        {state.friends
                  && state.friends.map((friend) => {
                    // friend: { username: 'nebulablade', photoURL: '', online:true }
                    return (
                      <div className={styles.myFriend} key={friend.username}>
                        <figure className="image is-48x48 is-rounded no-image">
                          {/* <img src={friend.photoURL} alt={friend.username.substring(0, 1)} /> */}
                          <span>{friend.username.split(' ').map((a) => a.substring(0, 1))}</span>
                        </figure>
                        <p>{friend.username}</p>
                      </div>
                    )
                  })}
      </div>
      {state.addFriendModal ? (
        <div className="modal is-active">
          <div
            className="modal-background"
            onClick={() => {
              setState({ addFriendModal: false, })
            }}
          ></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Title</p>
              <button
                className="delete is-medium"
                onClick={() => {
                  setState({ addFriendModal: false, })
                }}
              ></button>
            </header>
            <section className="modal-card-body"></section>
            <footer className="modal-card-foot buttons is-right">
              <button
                className="button"
                type="button"
                onClick={() => {
                  setState({ addFriendModal: false, })
                }}
              >
                <span>Cancel</span>
              </button>
              <button className="button is-primary" type="button">
                <span>Add Friend</span>
              </button>
            </footer>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  )
}
