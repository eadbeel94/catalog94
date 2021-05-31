/** @namespace view/AddItem */

import { useState } from "react";

import { 
  IonCard, 
  IonCardTitle, 
  IonChip, 
  IonIcon, 
  IonLabel, 
  IonCardContent, 
  IonItem , 
  IonInput , 
  IonButton , 
  IonToast 
} from '@ionic/react';

import { save , addCircle , shuffle } from 'ionicons/icons';

import { useMessage } from '../hooks/main';
import { fetchSend } from '../js/helper.js';

/** 
 * Initial state for each input/criterion into form
 * @const {object} initState
 * @memberof view/AddItem
 */
const initState= { vin: "", name: "", manuf: "" , model: "" , type: "" , fuel: "" , color: "" };

/**
 * Component for showing a Form with fields for create a new element.
 * @component
 * @returns JSX Element that include a form
 */
const AddItem: React.FC<{ actNotAuth: Function }>  = ({ actNotAuth }) => {

  /** 
   * State variable that include each input value into form
   * @constant itemForm-setItemForm
   * @type {useState}  
   * @memberof view/AddItem
   */
  const [ itemForm , setItemForm ]:any = useState(initState);
  /** 
   * State variable that is used in toast component
   * @constant isToast-setToast-initToast
   * @type {useMessage}  
   * @memberof view/AddItem
   */
  const [ isToast , setToast , , , initToast ]: any= useMessage({ req: false, mess: "", time: 2000 });
  /**
   * send request to save element into backend
   * @function saveItem
   * @param {Event} ev click event button save press into form
   * @memberof view/AddItem
   */
  const saveItem= async (ev: any)=>{
    ev.preventDefault();
    const url= `/vehicle/addOne`;
    const { stat , mess , noauth }= await fetchSend( url, "POST" , itemForm );

    noauth && actNotAuth(mess);
    !stat && setToast(mess);
    stat && setToast('Vehicle created successfully');
    stat && setItemForm(initState);
  };
  /**
   * for each change into a input, this value will save into state variable
   * @function handleChange
   * @param {Event} ev user modify any input event
   * @memberof view/AddItem
   */
  const handleChange= ({ target }:{ target: any })=>{
    setItemForm({ ...itemForm , [target.name]: target.value });
  };

  const genRandom= async ()=>{
    const url= `/vehicle/getRandom`;
    const { stat , data , mess , noauth }= await fetchSend( url, undefined, undefined );
    setToast(mess);
    noauth && actNotAuth(mess);
    stat && setItemForm(data);
  }

  return (
    <>
      <form onSubmit={ saveItem } >
        <IonCard>
          <IonCardTitle>
            <IonChip color="transparent">
              <IonIcon icon={addCircle} />
              <IonLabel> ADD ITEM </IonLabel>
            </IonChip>
          </IonCardTitle>
          <IonCardContent>
            <IonItem >
              <IonLabel >VIN:</IonLabel>
              <IonInput 
                name= "vin"
                type='text' 
                required 
                placeholder="87H79WDZ5CH130241" 
                value={ itemForm.vin } 
                onKeyUp={ handleChange } 
              />
            </IonItem>
            <IonItem >
              <IonLabel >NAME:</IonLabel>
              <IonInput 
                name= "name"
                type='text' 
                required 
                placeholder="Fiat Land Cruiser" 
                value={ itemForm.name } 
                onKeyUp={ handleChange } 
              />
            </IonItem>
            <IonItem >
              <IonLabel >MANUF:</IonLabel>
              <IonInput 
                name= "manuf"
                type='text' 
                required 
                placeholder="Tesla" 
                value={ itemForm.manuf } 
                onKeyUp={ handleChange } 
              />
            </IonItem>
            <IonItem >
              <IonLabel >MODEL:</IonLabel>
              <IonInput 
                name= "model"
                type='text' 
                required 
                placeholder="Camaro" 
                value={ itemForm.model } 
                onKeyUp={ handleChange } 
              />
            </IonItem>
            <IonItem >
              <IonLabel >TYPE:</IonLabel>
              <IonInput 
                name= "type"
                type='text' 
                placeholder="Passenger Van" 
                value={ itemForm.type } 
                onKeyUp={ handleChange } 
              />
            </IonItem>
            <IonItem >
              <IonLabel >FUEL:</IonLabel>
              <IonInput 
                name= "fuel"
                type='text' 
                required 
                placeholder="Diesel" 
                value={ itemForm.fuel } 
                onKeyUp={ handleChange } 
              />
            </IonItem>
            <IonItem >
              <IonLabel >COLOR:</IonLabel>
              <IonInput 
                name= "color"
                type='text' 
                placeholder="azure" 
                value={ itemForm.color } 
                onKeyUp={ handleChange } 
              />
            </IonItem>

            <div className="ion-text-center">
              <IonButton type="submit" fill="clear" class="btn-outline-typeA" style={{ width: "45%" , marginRigth: "0.5rem" }}> 
                <IonIcon icon={save} /> SAVE
              </IonButton>
              <IonButton onClick={ genRandom } type="button" fill="clear" class="btn-outline-typeB" style={{ width: "45%" , marginLeft: "0.5rem" }}> 
                <IonIcon icon={shuffle} /> RANDOM 
              </IonButton> 
            </div>
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

export default AddItem;
