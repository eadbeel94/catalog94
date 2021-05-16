import { IonChip, IonLabel, IonButton, IonIcon } from '@ionic/react';

import { cloudCircleOutline , cloudDownload , cloudUpload } from 'ionicons/icons';

/**
 * Component for showing two buttons.
 * @component
 * @returns JSX Element that include a Idiv with to buttons (donwload and upload database options)
 */
const ButtonUD: React.FC = () => {
  return (
    <div className="container-tab2 button-group-UD">
      <IonChip outline color="white">
        <IonIcon icon={cloudCircleOutline} />
        <IonLabel >UP/DOWN DATABASE</IonLabel>
      </IonChip>
      <br />
      <IonButton 
        type="button" 
        fill='outline' 
        color="secondary"
        onClick={ ()=> {} }
      > 
        <IonIcon icon={cloudDownload} className="ion-padding-end" /> DOWNLOAD
      </IonButton> 
      <IonButton 
        type="button" 
        fill='outline' 
        color="success"
        onClick={ ()=> {} }
      > 
        <IonIcon icon={ cloudUpload} className="ion-padding-end" /> UPLOAD 
      </IonButton> 
    </div>
  );
};

export default ButtonUD;