import { IonCard, IonCardTitle, IonChip, IonIcon, IonLabel , IonCardContent, IonImg } from '@ionic/react';

import { informationCircleOutline } from 'ionicons/icons';

const About: React.FC = () => {
  return (
    <IonCard style={{padding: '1rem'}}>
      <IonCardTitle>
        <IonChip outline color='white' style={{color: 'skyblue'}}>
          <IonIcon icon={informationCircleOutline} />
          <IonLabel >ABOUT</IonLabel>
        </IonChip>
      </IonCardTitle>
      <IonCardContent style={{textAlign:"center", fontFamily: 'poppins1', fontSize: '15px'}}>
        GM CATALOG IS A MOBILE APP THAT CAN SHOW ALL ELEMENTS INTO SAP'S LIST WHIT FEATURES VERY EASY OF USE, ALL THESE FROM YOUR PHONE.
        <br/>
        <IonChip style={{height: '50px', borderRadius: '0', backgroundColor: 'transparent'}}>
          { /**<IonImg src={brand} style={{width: '250px'}}/> */ }
        </IonChip>
      </IonCardContent>
      <IonCardContent style={{textAlign:"center"}}>
        THIS APP WAS CREATED FOR WEB FULL STACK DEVELOPER <strong>ADBEEL ESTRADA</strong>, BMB TEAM MEMBER
        <br/>
        <IonChip style={{height: '100px', borderRadius: '0' , backgroundColor: 'transparent'}}>
          {  /**<IonImg src={own} style={{width: '100px'}}/> */}
        </IonChip>
        <br/>
        <span style={{fontSize: '12px', fontFamily: 'righte1'}}>
          GM-CATALOG COPYRIGHT© 2021 
          <br/>
          ALL RIGHTS RESERVED DESIGNED BY EADBEEL94
        </span>
      </IonCardContent>
      
    </IonCard>
  );
};

export default About;