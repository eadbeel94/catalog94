import { useState } from "react";

import { IonCard, IonCardTitle, IonChip, IonIcon , IonLabel , IonCardContent , IonItem , IonInput , IonButton , IonToast } from '@ionic/react';

import { personAdd , save } from 'ionicons/icons';

import { useMessage } from '../hooks/main.jsx';
import { fetchSend } from '../js/helper.js';

const IP= `http://localhost:3001/api/login`;

const initState= { account: "", fullname: "", pass: "" , rpass: "" };
const AddUser: React.FC = () => {

  const [userForm, setUserForm] = useState(initState);
  const [ isToast , setToast , , , initToast ]: any= useMessage({ req: false, mess: "", time: 1000 });

  const saveUser= async (ev: any)=>{
    ev.preventDefault();
    const url= `${IP}/addUser`;
    const { stat , mess }= await fetchSend( url, "POST" , userForm );

    if( !stat ){
      setToast(mess);
      setUserForm({ ...userForm , pass: "" , rpass: "" })
    }else{
      setToast('User created successfully');
      setUserForm(initState);
    } 
  };

  const handleChange= ({ target }:{ target: any })=>{
    setUserForm({ ...userForm , [target.name]: target.value });
  };
  
  return (
    <>
      <form onSubmit={ saveUser }>
        <IonCard>
          <IonCardTitle>
            <IonChip color="transparent">
              <IonIcon icon={personAdd} />
              <IonLabel> ADD USER </IonLabel>
            </IonChip>
          </IonCardTitle>
          <IonCardContent>
            <IonItem >
              <IonLabel >ACCOUNT:</IonLabel>
              <IonInput 
                name="account" 
                required 
                type='text' 
                placeholder="SUPERVISOR" 
                value= { userForm.account } 
                onKeyDown={ handleChange } 
              />
            </IonItem>
            <IonItem >
              <IonLabel >F-NAME:</IonLabel>
              <IonInput 
                name="fullname" 
                type='text' 
                placeholder="LIC. VALERIANO II" 
                value= { userForm.fullname } 
                onKeyDown={ handleChange } 
              />
            </IonItem>
            <IonItem >
              <IonLabel >PASS:</IonLabel>
              <IonInput 
                name="pass" 
                type="password" 
                required 
                placeholder="SECRET" 
                value= { userForm.pass } 
                onKeyDown={ handleChange } 
              />
            </IonItem>
            <IonItem >
              <IonLabel >R-PASS:</IonLabel>
              <IonInput 
                name="rpass" 
                type="password" 
                required 
                placeholder="SECRET" 
                value= { userForm.rpass } 
                onKeyDown={ handleChange } 
              />
            </IonItem>

            <IonButton type="submit" fill="clear" class={'btn-outline-type1'} expand="block" style={{fontFamily: 'poppins1', fontSize: '18px', height: '32px'}}> 
              <IonIcon icon={save} /> SAVE 
            </IonButton> 
          </IonCardContent>
        </IonCard>
      </form>

      <IonToast
        isOpen= { isToast.req }
        message= { isToast.mess }
        duration= { isToast.time }
        onDidDismiss= { initToast }
      />
    </>
  );
};

export default AddUser;
