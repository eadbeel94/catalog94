import { IonPopover, IonCard , IonCardHeader , IonCardTitle , IonCardSubtitle , IonChip , IonIcon , IonCardContent , IonItem , IonLabel , IonInput , IonButton } from '@ionic/react';

import { peopleCircleOutline , enterOutline } from 'ionicons/icons';

const Login: React.FC = () => {
  return (
    <IonPopover isOpen={ true } cssClass='pop2' onDidDismiss={() => {} } >
      <form style={{ }} onSubmit={ ()=>{} }>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle >LOGIN </IonCardTitle>
            <IonCardSubtitle>
              <IonChip>
                <IonIcon icon={peopleCircleOutline}  />
              </IonChip>
            </IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            <IonItem>
              <IonLabel position="floating">USER</IonLabel>
              <IonInput ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="floating">PASSWORD</IonLabel>
              <IonInput type="password"></IonInput>
            </IonItem>

            <IonButton type="submit" color="info" fill='outline' expand='block' > 
              <IonIcon icon={enterOutline} style={{ paddingRight: '0.5rem' }}/> ENTER 
            </IonButton> 

          </IonCardContent>
        </IonCard>
      </form>
    </IonPopover>
  );
};

export default Login;
















