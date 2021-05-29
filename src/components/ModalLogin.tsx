/** @namespace components/login */

import { 
  IonPopover, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardSubtitle, 
  IonChip, 
  IonIcon, 
  IonCardContent, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonButton, 
  IonToast 
} from '@ionic/react';

import { peopleCircleOutline , enterOutline } from 'ionicons/icons';

import { useMessage } from '../hooks/main.jsx';
import { fetchSend } from '../js/helper.js';

/** 
 * Common IP for fetch operations
 * @const {string} IP
 * @memberof components/login
 */
const IP= `http://localhost:3001/api/users`;

/**
 * Component for showing a Modal login
 * @component
 * @returns JSX Element that include a form
 */
const ModalLogin: React.FC<{ show: any, actClose: any, actSignIn: any }> = ({ show, actClose, actSignIn }) => {
  /** 
   * State variable that is used in toast component
   * @constant isToast-setToast-initToast
   * @type {useMessage}  
   * @memberof components/login
   */
  const [ isToast , setToast , , , initToast ]: any= useMessage({ req: false, mess: "", time: 1000 });
  /**
   * send user data to backend and process validation
   * @function saveItem
   * @param {Event} ev click event button save press into form
   * @memberof components/login
   */
  const signing= async (ev: any)=>{
    ev.preventDefault();
    const url= `${ IP }/auth`;
    const send= { username: String(ev.target[0].value).toUpperCase() , password: ev.target[1].value };
    const { stat , data , mess }= await fetchSend( url , "POST" , send );

    setToast(mess);
    localStorage.setItem('logged','true');
    localStorage.setItem('username', String(data) );
    actSignIn({ logged: stat , name: data });
    actClose();
  };

  return (
    <>
      <IonPopover isOpen={ show } cssClass='pop2' onDidDismiss={ actClose } >
        <form onSubmit={ signing }>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle >LOGIN </IonCardTitle>
              <IonCardSubtitle>
                <IonChip>
                  <IonIcon icon={peopleCircleOutline}  />
                </IonChip>
              </IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              <IonItem>
                <IonLabel position="floating">USER</IonLabel>
                <IonInput required></IonInput>
              </IonItem>

              <IonItem>
                <IonLabel position="floating">PASSWORD</IonLabel>
                <IonInput type="password" required></IonInput>
              </IonItem>

              <IonButton type="submit" color="info" fill='outline' expand='block' > 
                <IonIcon icon={enterOutline} className="ion-padding-end" /> ENTER 
              </IonButton> 

            </IonCardContent>
          </IonCard>
        </form>
      </IonPopover>
      <IonToast
        isOpen= { isToast.req }
        message= { isToast.mess }
        duration= { isToast.time }
        onDidDismiss= { initToast }
      />
    </>
  );
};

export default ModalLogin;
















