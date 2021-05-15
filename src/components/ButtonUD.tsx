import { IonChip, IonLabel, IonButton, IonIcon } from '@ionic/react';

import { cloudCircleOutline , cloudDownload , cloudUpload } from 'ionicons/icons';

const ButtonUD: React.FC = () => {
  return (
    <div style={{textAlign: 'center', marginTop: '0.5rem',  marginBottom: '1rem', color: 'skyblue' }}>
      <IonChip outline color="white">
        <IonIcon icon={cloudCircleOutline} />
        <IonLabel >UP/DOWN DATABASE</IonLabel>
      </IonChip>
      <br />
      <IonButton type="button" fill='outline' color="secondary"
                  style={{width: '45%', fontFamily: 'righte1'}} 
                  onClick={ ()=> {} }> 
        <IonIcon icon={cloudDownload} style={{ paddingRight: '0.25rem' }}/> DOWNLOAD
      </IonButton> 
      <IonButton type="button" fill='outline' color="success"
                  style={{width: '45%', fontFamily: 'righte1'}} 
                  onClick={ ()=> {} }> 
        <IonIcon icon={ cloudUpload} style={{ paddingRight: '0.25rem' }}/> UPLOAD 
      </IonButton> 
    </div>
  );
};

export default ButtonUD;