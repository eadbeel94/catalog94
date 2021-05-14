import { IonHeader, IonTitle, IonToolbar, IonIcon } from '@ionic/react';

import { logoIonic , receipt } from 'ionicons/icons';

const Header: React.FC = () => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonIcon icon={receipt} slot="start" className="ion-padding-start" style={{ fontSize: "40px"  }} />
        <IonTitle color="primary" className="ion-text-center">CATALOG 94</IonTitle>
        <IonIcon icon={logoIonic} slot="end" className="ion-padding-end" style={{ fontSize: "40px"  }} />
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
