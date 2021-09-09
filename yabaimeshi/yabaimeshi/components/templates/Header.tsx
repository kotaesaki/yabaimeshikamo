import React, { useEffect, useState } from "react";
import { Input, Menu, Image } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css'
import { getAuth, signInWithPopup, TwitterAuthProvider } from 'firebase/auth';
import * as firebase from "firebase/app";
import 'semantic-ui-css/semantic.min.css'
import { firebaseConfig } from '../../ts/FirebaseConfig';

export const Header = () => {
  const [uid, setUid] = useState<string | null>(null)
  const [name, setName] = useState<string | null>(null)
  const [icon, setIcon] = useState<string | null>(null)

  useEffect(() => {
    setUid(localStorage.getItem('uid'))
    setName(localStorage.getItem('name'))
    setIcon(localStorage.getItem('icon'))
  })

  if(!firebase.getApps().length){
    firebase.initializeApp(firebaseConfig)
  }
  const provider = new TwitterAuthProvider();
  const auth = getAuth();
  const twitterLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = TwitterAuthProvider.credentialFromResult(result);
        const token = credential ? credential.accessToken : undefined;
        const secret = credential ? credential.secret : undefined;
        localStorage.setItem('uid', result.user.uid)
        localStorage.setItem('email', result.user.email ?? '')
        localStorage.setItem('name', result.user.displayName ?? '')
        localStorage.setItem('icon', result.user.photoURL ?? '')
        setUid(localStorage.getItem('uid'))
        setName(localStorage.getItem('name'))
        setUid(localStorage.getItem('icon'))
      })
      .catch((error: string) => {
        console.log(error);
      });
  };

  const logout = () => {
    localStorage.removeItem('uid')
    localStorage.removeItem('email')
    localStorage.removeItem('name')
    localStorage.removeItem('icon')
    setUid(null)
    setName(null)
    setIcon(null)
  }

  return(
    <>
      <Menu color='blue' inverted secondary>
        <Menu.Item name='Yabaimeshi'>
        </Menu.Item>
        <Menu.Menu position='right'>
          {
            uid ? 
            <Menu.Item><Image src={icon} onClick={() => logout()} avatar/><span>{name}</span></Menu.Item> : 
            <Menu.Item name='Twitterログイン' onClick={() => twitterLogin()}></Menu.Item>
          }
        </Menu.Menu>
      </Menu>
    </>
  );
}