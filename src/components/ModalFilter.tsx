import { useState } from 'react';

import { IonModal , IonList , IonItem , IonLabel , IonSelect , IonSelectOption , IonButton } from '@ionic/react';

const initState= { color: "" , fuel: "" , manuf: "" , types: "" };

const ModalFilter: React.FC<{ isOpen: boolean , types: any , actClose: any , actSelect: any }> = (props) => {
  const { isOpen, types , actClose , actSelect }= props;
  const [ selected , setSelected ] = useState(initState);

  const handlerChanges= ({target}:{ target: any })=> {
    setSelected({ ...selected , [target.name]: target.value })
  };

  const handleReset= ()=> {
    setSelected(initState);
  }

  const handleClose= ()=>{
    actSelect(selected);
    actClose();
    //setSelected(initState);
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

/*
      <IonList>
        {
          Object.entries(list).map( (type:any) => <IonItem key={ `type-${type[0]}` }>
              <IonLabel>{ type[0] }</IonLabel>
              <IonSelect name={ type[0] } placeholder="Select One" onIonChange= { handlerChanges } >
                {
                  type[1] && type[1].length && type[1].map( (el: any, ind: any)=> <IonSelectOption key={ `select-${ind}` } value={ el }> { el } </IonSelectOption> )
                }
              </IonSelect>
            </IonItem>
          )
        }
      </IonList>
*/