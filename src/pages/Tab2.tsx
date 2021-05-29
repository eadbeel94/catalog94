/** @namespace pages/Tab2 */

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
  IonToast
} from '@ionic/react';

import { save , personCircleOutline } from 'ionicons/icons';

import Header from '../components/Header';
import ModalLogin from '../components/ModalLogin';
import AddItem from '../components/AddUser';
import AddUser from '../components/AddItem';
import ButtonUD from '../components/ButtonUD';
import About from '../components/About';

import { useShowHide , useAlert , useMessage } from '../hooks/main.jsx';
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
   * @memberof pages/Tab2
   */
  const [user, setUser] = useState({ logged: false, name: "" });
  /** 
   * State variable that show and hide Modal login component
   * @constant login-openLogin-closeLogin
   * @type {useState}  
   * @memberof pages/Tab2
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
   const [ isToast , setToast , , , initToast ]: any= useMessage({ req: false, mess: "", time: 1000 });

  /**
   * First time to open Tab2, then show login modal
   * @callback useEffect->openLogin
   * @memberof pages/Tab2
   */
  useEffect(() => {
    !user.logged && openLogin();
  },[]);
  /**
   * If user press logout button, then hide and show group of components
   * @function logout
   * @memberof pages/Tab2
   */
  const logout= ()=>{
    setAlert( "Do you wanna close this session?" , async ()=>{
      console.log('close end');
      const url= `http://localhost:3001/api/users/logout`;
      const { stat , mess }= await fetchSend( url , undefined , undefined );

      setToast(mess);
      if(stat){
        setUser({ logged: false , name: "" });
        localStorage.removeItem('logged');
        localStorage.removeItem('username');
      };
    });
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
                  <AddItem/>
                </IonCol>
                <IonCol sizeXs="12" sizeMd="6" sizeLg="5" >
                  <AddUser/>
                </IonCol>
                <IonCol sizeXs="12" sizeMd="6" sizeLg="6" offsetMd="3" offsetLg="3" >
                <ButtonUD/>
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
          header={'CATALOG M'} 
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
