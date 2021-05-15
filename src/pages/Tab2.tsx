import { useState , useEffect } from "react";

import { IonContent , IonPage , IonChip , IonIcon , IonLabel , IonButton } from '@ionic/react';

import { save , personCircleOutline } from 'ionicons/icons';
//import { cloudCircleOutline , cloudDownload , cloudUpload } from 'ionicons/icons';

import Header from '../components/Header';
import Login from '../components/Login';
import AddItem from '../components/AddUser';
import AddUser from '../components/AddItem';
import ButtonUD from '../components/ButtonUD';
import About from '../components/About';

import { useShowHide } from '../hooks/main.jsx';

import './Tab2.css';

const Tab2: React.FC = () => {

  const [user, setUser] = useState({ logged: false, name: "" });

  const [ login, openLogin, closeLogin ]: any= useShowHide({ req: false });

  useEffect(() => {
    !user.logged && openLogin();
  },[])

  const logout= ()=>{
    setUser({ logged: false , name: "" });
    localStorage.removeItem('logged');
    localStorage.removeItem('username');
  }

  return (
    <IonPage>
      <Header/>
      <IonContent fullscreen>

        <div style={{textAlign: 'center', marginTop: '0.5rem', color: 'skyblue'}}>
          <IonChip outline color="white">
            <IonIcon icon={personCircleOutline} />
            <IonLabel >{ user.logged ? user.name : 'NOT LOGGED' }</IonLabel>
          </IonChip>
        </div>

        {
          !user.logged ? 
          <>
            <div className="ion-text-center">
              <IonButton 
                type="button" 
                fill='clear' 
                class='btn-type3' 
                style={{width: '200px'}} 
                onClick={ openLogin }
              > 
                <IonIcon icon={save} /> SIGN IN 
              </IonButton> 
            </div>
          </> : <div className="body-2">
            <AddItem/>
            <AddUser/>
            <ButtonUD/>
          </div>
        }

        <About/>

        {
          user.logged && <div style={{textAlign: 'center'}}>
            <IonButton 
              type="button" 
              fill='clear' 
              class='btn-type4' 
              onClick={ logout }
            > 
              <IonIcon icon={save} /> SIGN OUT
            </IonButton> 
          </div>
        }

        <Login show={ login } actClose= { closeLogin } actSignIn= { setUser } />

      </IonContent>
    </IonPage>
  );
};

export default Tab2;
