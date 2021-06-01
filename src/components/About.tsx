import { 
  IonCard, 
  IonCardTitle, 
  IonChip, 
  IonIcon, 
  IonLabel, 
  IonCardContent, 
  IonImg 
} from '@ionic/react';

import { informationCircleOutline } from 'ionicons/icons';

import logo1 from '../theme/img/logo1.png';

/**
 * Component for showing details about page.
 * @component
 * @returns JSX Element that include a Ion Card
 */
const About: React.FC = () => {
  return (
    <IonCard id="sec_about" className="ion-padding-top">
      <IonCardTitle>
        <IonChip outline color='white'>
          <IonIcon icon={informationCircleOutline} />
          <IonLabel >ABOUT</IonLabel>
        </IonChip>
      </IonCardTitle>
      <IonCardContent className="ion-text-center">
        CATALOG 94 IS A MOBILE APP THAT CAN SHOW ALL ELEMENTS INTO LIST WHIT FEATURES VERY EASY OF USE, ALL THESE FROM YOUR PHONE.
      </IonCardContent>
      <IonCardContent className="ion-text-center">
        THIS APP WAS CREATED FOR WEB FULL STACK DEVELOPER <strong>ADBEEL ESTRADA</strong>
        <br/>
        <IonChip>
          <IonImg src={logo1}/>
        </IonChip>
        <br/>
        <p>
          SEE DOCUMENTATION, ENTER THIS LINK <a href="https://catalog94.herokuapp.com/static/doc/">DOCUMENTATION</a>
        </p>
        <span>
          CATALOG 94 COPYRIGHT© 2021 
          <br/>
          ALL RIGHTS RESERVED DESIGNED BY <a href="https://eadbeel94.web.app/" target="_blank">EADBEEL94</a>
        </span>
      </IonCardContent>
      
    </IonCard>
  );
};

export default About;