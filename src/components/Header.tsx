import { IonHeader, IonTitle, IonToolbar, IonIcon } from '@ionic/react';

import { logoIonic , receipt } from 'ionicons/icons';

/**
 * Component for showing header and both tabs.
 * @component
 * @returns JSX Element that include a Ion Fab
 */
const Header: React.FC = () => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonIcon icon={receipt} slot="start" className="ion-padding-start" />
        <IonTitle color="primary" className="ion-text-center">CATALOG 94</IonTitle>
        <IonIcon icon={logoIonic} slot="end" className="ion-padding-end" />
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
