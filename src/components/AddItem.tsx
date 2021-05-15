import { useState } from "react";

import { IonCard, IonCardTitle, IonChip, IonIcon, IonLabel, IonCardContent, IonItem , IonInput , IonButton , IonToast } from '@ionic/react';

import { save , addCircle } from 'ionicons/icons';

import { useMessage } from '../hooks/main.jsx';
import { fetchSend } from '../js/helper.js';

const IP= `http://localhost:3001/api/vehicle`;

const initState= { vin: "", name: "", manuf: "" , model: "" , type: "" , fuel: "" , color: "" };
const AddItem: React.FC = () => {

  const [ itemForm , setItemForm ] = useState(initState);
  const [ isToast , setToast , , , initToast ]: any= useMessage({ req: false, mess: "", time: 1000 });

  const aaveItem= async (ev: any)=>{
    ev.preventDefault();
    const url= `${IP}/addOne`;
    const { stat , mess }= await fetchSend( url, "POST" , itemForm );

    !stat && setToast(mess);
    stat && setToast('Vehicle created successfully');
    stat && setItemForm(initState);
  };

  const handleChange= ({ target }:{ target: any })=>{
    setItemForm({ ...itemForm , [target.name]: target.value });
  };

  return (
    <>
      <form onSubmit={ aaveItem } >
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
                onKeyDown={ handleChange } 
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
                onKeyDown={ handleChange } 
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
                onKeyDown={ handleChange } 
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
                onKeyDown={ handleChange } 
              />
            </IonItem>
            <IonItem >
              <IonLabel >TYPE:</IonLabel>
              <IonInput 
                name= "type"
                type='text' 
                placeholder="Passenger Van" 
                value={ itemForm.type } 
                onKeyDown={ handleChange } 
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
                onKeyDown={ handleChange } 
              />
            </IonItem>
            <IonItem >
              <IonLabel >COLOR:</IonLabel>
              <IonInput 
                name= "color"
                type='text' 
                placeholder="azure" 
                value={ itemForm.color } 
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

export default AddItem;
