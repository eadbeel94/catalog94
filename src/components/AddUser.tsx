/** @namespace view/AddUser */

import { useState } from "react";

import { 
  IonCard, 
  IonCardTitle, 
  IonChip, 
  IonIcon, 
  IonLabel, 
  IonCardContent, 
  IonItem, 
  IonInput, 
  IonButton, 
  IonToast 
} from '@ionic/react';

import { personAdd , save } from 'ionicons/icons';

import { useMessage } from '../hooks/main';
import { fetchSend } from '../js/helper.js';

/** 
 * Initial state for each input/criterion into add user form
 * @const {object} initState
 * @memberof view/AddUser
 */
const initState= { account: "", fullname: "", password: "" , confirm: "" };

/**
 * Component for showing a Form with fields for create a new user.
 * @component
 * @param {object} props Group elements that inicialize this component
 * @param {function} props.actNotAuth function that exceute parent fcn when user is not detect from backend
 * @returns JSX Element that include a form
 */
const AddUser: React.FC<{ actNotAuth: Function }>  = ({ actNotAuth }) => {

  /** 
   * State variable that include each input value into form
   * @constant userForm-setUserForm
   * @type {useState}  
   * @memberof view/AddUser
   */
  const [userForm, setUserForm]:any = useState(initState);
  /** 
   * State variable that is used in toast component
   * @constant isToast-setToast-initToast
   * @type {useMessage}  
   * @memberof view/AddUser
   */
  const [ isToast , setToast , , , initToast ]: any= useMessage({ req: false, mess: "", time: 3500 });
  /**
   * send request to save user into backend
   * @function saveUser
   * @param {Event} ev click event button save press into form
   * @memberof view/AddUser
   */
  const saveUser= async (ev: any)=>{
    ev.preventDefault();
    const url= `/users/addOne`;
    const { stat , mess , noauth }= await fetchSend( url, "POST" , userForm );

    noauth && actNotAuth(mess);
    if( !stat ){
      setToast(mess);
      setUserForm({ ...userForm , password: "" , confirm: "" })
    }else{
      setToast('User created successfully');
      setUserForm(initState);
    };
  };
  /**
   * for each change into a input, this value will save into state variable
   * @function handleChange
   * @param {Event} ev user modify any input event
   * @memberof view/AddUser
   */
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
                onKeyUp={ handleChange } 
              />
            </IonItem>
            <IonItem >
              <IonLabel >F-NAME:</IonLabel>
              <IonInput 
                name="fullname" 
                type='text' 
                placeholder="LIC. VALERIANO II" 
                value= { userForm.fullname } 
                onKeyUp={ handleChange } 
              />
            </IonItem>
            <IonItem >
              <IonLabel >PASS:</IonLabel>
              <IonInput 
                name="password" 
                type="password" 
                required 
                placeholder="SECRET" 
                value= { userForm.password } 
                onKeyUp={ handleChange } 
              />
            </IonItem>
            <IonItem >
              <IonLabel >R-PASS:</IonLabel>
              <IonInput 
                name="confirm" 
                type="password" 
                required 
                placeholder="SECRET" 
                value= { userForm.confirm } 
                onKeyUp={ handleChange } 
              />
            </IonItem>

            <IonButton type="submit" fill="clear" class='btn-outline-typeA w-75' expand="block"> 
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
