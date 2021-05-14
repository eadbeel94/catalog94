import { IonFab, IonFabButton, IonIcon } from '@ionic/react';

import { filterCircle } from 'ionicons/icons';

const Header: React.FC<{ onClick: VoidFunction }> = ({ onClick }) => {
  return (
    <IonFab vertical="bottom" horizontal="end" slot="fixed">
      <IonFabButton color="primary" onClick={ onClick } >
        <IonIcon icon={filterCircle} style={{ fontSize: "40px" }}/>
      </IonFabButton>
    </IonFab>
  );
};

export default Header;
