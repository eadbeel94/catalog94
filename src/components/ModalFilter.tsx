/** @namespace components/ModalFilter */

import { useState } from 'react';

import { 
  IonModal, 
  IonList, 
  IonItem, 
  IonLabel, 
  IonSelect, 
  IonSelectOption, 
  IonButton 
} from '@ionic/react';
/** 
 * Initial state for each input/criterion into form
 * @const {object} initState
 * @memberof components/ModalFilter
 */
const initState= { color: "" , fuel: "" , manuf: "" , types: "" };

/**
 * Component for showing a Form with fields for create a new element.
 * @component
 * @returns JSX Element that include a form
 */
const ModalFilter: React.FC<{ isOpen: boolean , types: any , actClose: any , actSelect: any }> = (props) => {
  const { isOpen, types , actClose , actSelect }= props;
  
  /** 
   * State variable that include each "select" value into form
   * @constant selected-setSelected
   * @type {useState}  
   * @memberof components/ModalFilter
   */
  const [ selected , setSelected ] = useState(initState);
  /**
   * for each change into a select, this value will save into state variable
   * @function handleChange
   * @param {Event} ev user modify any select event
   * @memberof components/ModalFilter
   */
  const handlerChanges= ({target}:{ target: any })=> {
    setSelected({ ...selected , [target.name]: target.value })
  };
  /**
   * Initialice all state variables
   * @function handleReset
   * @memberof components/ModalFilter
   */
  const handleReset= ()=> {
    setSelected(initState);
  };
  /**
   * Execute parent funtion and close Modal
   * @function handleReset
   * @memberof components/ModalFilter
   */
  const handleClose= ()=>{
    actSelect(selected);
    actClose();
  };

  return (
    <IonModal isOpen={ isOpen } cssClass='modal-filter'>

      <IonList>

        <IonItem>
          <IonLabel>Color</IonLabel>
          <IonSelect name="color" placeholder="Select One" onIonChange= { handlerChanges } value= { selected.color } >
            {
              types.length && types[0].map( (el: any, ind: any)=> <IonSelectOption key={ `type0-${ind}` } value={ el }>{ el } </IonSelectOption> )
            }
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel>Fuel</IonLabel>
          <IonSelect name="fuel" placeholder="Select One" onIonChange= { handlerChanges } value= { selected.fuel } >
            {
              types.length && types[1].map( (el: any, ind: any)=> <IonSelectOption key={ `type1-${ind}` } value={ el }>{ el } </IonSelectOption> )
            }
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel>Manufacture</IonLabel>
          <IonSelect name="manuf" placeholder="Select One" onIonChange= { handlerChanges } value= { selected.manuf } >
            {
              types.length && types[2].map( (el: any, ind: any)=> <IonSelectOption key={ `type2-${ind}` } value={ el }>{ el } </IonSelectOption> )
            }
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel>Type</IonLabel>
          <IonSelect name="types" placeholder="Select One" onIonChange= { handlerChanges } value= { selected.types } >
            {
              types.length && types[3].map( (el: any, ind: any)=> <IonSelectOption key={ `type3-${ind}` } value={ el }>{ el } </IonSelectOption> )
            }
          </IonSelect>
        </IonItem>

      </IonList>

      <IonButton onClick= { handleReset }> Reset Selects  </IonButton>
      <IonButton onClick= { handleClose }> Close Modal    </IonButton>
    </IonModal>
  );
};

export default ModalFilter;