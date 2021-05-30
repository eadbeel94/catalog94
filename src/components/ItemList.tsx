import { IonCol, IonList, IonItem , IonLabel , IonIcon } from '@ionic/react';

import { caretForward } from 'ionicons/icons';

import { genGroup } from '../js/helper.js';

/**
 * Component for showing a list with elements group.
 * @component
 * @param {object} props Group elements that inicialize this component
 * @param {Array<object>} props.colum all vehicles a list of propierties
 * @param {number} props.ind row number  
 * @param {function} props.actClick function that execute a parent fcn when user press a vehicle in list
 * @returns JSX Element that include a Ion Card
 */
const ItemList: React.FC<{ colum: Array<object>, ind: number, actClick: Function }> = ({ colum , ind , actClick }) => {
  return (
    <IonCol sizeXs="12" sizeSm="6" sizeXl="4" className="ion-no-padding">
      <IonList>
        {
          colum.map( (el: any, ind2: any)=> <div key={ el.vin }>
              <IonItem button onClick={ ()=>actClick( el.vin ) } >
                <IonLabel>
                  <h4>{ genGroup( ind, ind2 ) } { el.name }</h4>
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
