import { IonFab, IonFabButton, IonIcon } from '@ionic/react';

import { filterCircle } from 'ionicons/icons';

/**
 * Component for showing button filter in screen rigth button 
 * @component
 * @param {object} props Group elements that inicialize this component
 * @param {function} props.onClick function that exceute parent fcn when user press button filter
 * @returns JSX Element that include a Ion Fab
 */
const ButtonFilter: React.FC<{ onClick: VoidFunction }> = ({ onClick }) => {
  return (
    <IonFab vertical="bottom" horizontal="end" slot="fixed">
      <IonFabButton color="primary" onClick={ onClick } >
        <IonIcon icon={filterCircle}/>
      </IonFabButton>
    </IonFab>
  );
};

export default ButtonFilter;
