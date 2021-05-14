import { IonCol, IonList, IonItem , IonLabel , IonIcon } from '@ionic/react';

import { caretForward } from 'ionicons/icons';

const genGroup= ( col=0, list="" )=> {
  let newcol;
  switch (col) {
    case 1:   newcol= "B"; break;
    case 2:   newcol= "C"; break;
    default:  newcol= "A"; break;
  }
  return `${newcol}${list} ->`;
};

const ItemList: React.FC<{ colum: any, ind: any, actClick: any }> = ({ colum , ind , actClick }) => {
  
  return (
    <IonCol sizeXs="12" sizeMd="6" sizeXl="4" className="ion-no-padding">
      <IonList>
        {
          colum.map( (el: any, el2: any)=> <div key={ el.vin }>
              <IonItem button onClick={ ()=>actClick( el.vin ) } >
                <IonLabel>
                  <h4>{ genGroup( ind, el2 ) } { el.name }</h4>
                  <h5>{ el.manuf }</h5>
                  <p> { el.type } - { el.fuel } </p>
                </IonLabel>
                <IonIcon icon={caretForward} slot="end" />
              </IonItem>
            </div> 
          )
        }
      </IonList>
    </IonCol>
  );
};

export default ItemList;
