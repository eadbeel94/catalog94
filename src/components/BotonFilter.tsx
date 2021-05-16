import { IonFab, IonFabButton, IonIcon } from '@ionic/react';

import { filterCircle } from 'ionicons/icons';

/**
 * Component for showing button filter in screen rigth button 
 * @component
 * @returns JSX Element that include a Ion Fab
 */
const Header: React.FC<{ onClick: VoidFunction }> = ({ onClick }) => {
  return (
    <IonFab vertical="bottom" horizontal="end" slot="fixed">
      <IonFabButton color="primary" onClick={ onClick } >
        <IonIcon icon={filterCircle}/>
      </IonFabButton>
    </IonFab>
  );
};

export default Header;
