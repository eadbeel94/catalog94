/** @namespace view/Tab2 */

import { useState , useEffect } from "react";

import { 
  IonContent, 
  IonPage, 
  IonChip, 
  IonIcon, 
  IonLabel, 
  IonButton, 
  IonGrid, 
  IonRow, 
  IonCol, 
  IonAlert,
  IonToast,
  useIonViewDidEnter
} from '@ionic/react';

import { save , personCircleOutline } from 'ionicons/icons';

import Header from '../components/Header';
import ModalLogin from '../components/ModalLogin';
import AddUser from '../components/AddUser';
import AddItem from '../components/AddItem';
import ButtonD from '../components/ButtonD';
import About from '../components/About';

import { useShowHide , useAlert , useMessage } from '../hooks/main';
import { fetchSend } from '../js/helper.js';

import './Tab2.css';

/**
 * Component for showing a forms group for add new elements/users
 * @component
 * @returns JSX Element that include Tab 2 body
 */
const Tab2: React.FC = () => {

  /** 
   * State variable that check loggin status and name user
   * @constant user-setUser
   * @type {useState}  
   * @memberof view/Tab2
   */
  const [user, setUser] = useState({ logged: false, name: "" });
  /** 
   * State variable that show and hide Modal login component
   * @constant login-openLogin-closeLogin
   * @type {useState}  
   * @memberof view/Tab2
   */
  const [ login, openLogin, closeLogin ]: any= useShowHide({ req: false });
  /** 
   * State variable that is used in alert component
   * @constant isToast-setToast-initToast
   * @type {useMessage}  
   * @memberof components/ModalItem
   */
   const [ alert , setAlert ,  ,  ,  initAlert ]:any= useAlert({ req: false , mess: "" , cb: ()=>{} });
  /** 
   * State variable that is used in toast component
   * @constant isToast-setToast-initToast
   * @type {useMessage}  
   * @memberof components/ModalItem
   */
   const [ isToast , setToast , , , initToast ]: any= useMessage({ req: false, mess: "", time: 3000 });

  /**
   * If user 
   * @function notAuth
   * @memberof view/Tab2
   */
   const notAuth= ( amessage: string )=>{
    amessage.length > 1 && setToast(amessage);
    setUser({ logged: false , name: "" });
    localStorage.removeItem('logged');
    localStorage.removeItem('username');
  }

  /**
   * First time to open Tab2, then show login modal
   * @callback useEffect->openLogin
   * @memberof view/Tab2
   */
  useEffect(() => {
    if( localStorage.getItem('logged') ){
      setUser({ logged: true , name: String(localStorage.getItem('username')) })
    }else{
      openLogin();
    } 
  },[]);

  useIonViewDidEnter(() =>{
    if(!localStorage.getItem('logged')){
      openLogin();
      notAuth("");
    };
  });

  /**
   * If user press logout button, then hide and show group of components
   * @function logout
   * @memberof view/Tab2
   */
  const logout= ()=>{
    setAlert( "Do you wanna close this session?" , async ()=> notAuth('Close session successfully') );
  };

  return (
    <IonPage>
      <Header/>
      <IonContent fullscreen>

        <div className="ion-text-center ion-margin-top">
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
                onClick={ openLogin }
              > 
                <IonIcon icon={save} /> SIGN IN 
              </IonButton> 
            </div>
          </> : <div className="body-2">
            <IonGrid className="container-tab2">
              <IonRow>
                <IonCol sizeXs="12" sizeMd="6" sizeLg="5" offsetLg="1" >
                  <AddUser actNotAuth= { notAuth } />
                </IonCol>
                <IonCol sizeXs="12" sizeMd="6" sizeLg="5" >
                  <AddItem actNotAuth= { notAuth } /> 
                </IonCol>
                <IonCol sizeXs="12" sizeMd="6" sizeLg="6" offsetMd="3" offsetLg="3" >
                  <ButtonD/>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
        }

        <IonGrid className="container-tab2">
          <IonRow>
            <IonCol className="ion-no-padding" sizeXs="12" sizeMd="6" sizeLg="6" offsetMd="3" offsetLg="3" >
              <About/>
            </IonCol>
          </IonRow>
        </IonGrid>

        {
          user.logged && <div className="ion-text-center">
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

        <ModalLogin 
          show={ login } 
          actClose= { closeLogin } 
          actSignIn= { setUser } 
        />

        <IonAlert 
          isOpen={ alert.req } 
          header={'CATALOG 94'} 
          onDidDismiss={ initAlert }
          message= { alert.mess }
          buttons={[
            {
              text: 'CANCEL', role: 'cancel'
            },{
              text: 'CONFIRM', handler: alert.cb
            }
          ]}
        />

        <IonToast
          isOpen= { isToast.req }
          message= { isToast.mess }
          duration= { isToast.time }
          onDidDismiss= { initToast }
        />

      </IonContent>
    </IonPage>
  );
};

export default Tab2;
