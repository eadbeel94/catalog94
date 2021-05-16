import { IonCol, IonList, IonItem , IonLabel , IonIcon } from '@ionic/react';

import { caretForward } from 'ionicons/icons';

import { genGroup } from '../js/helper.js';

/**
 * Component for showing a list with elements group.
 * @component
 * @returns JSX Element that include a Ion Card
 */
const ItemList: React.FC<{ colum: any, ind: any, actClick: any }> = ({ colum , ind , actClick }) => {
  return (
    <IonCol sizeXs="12" sizeSm="6" sizeXl="4" className="ion-no-padding">
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
