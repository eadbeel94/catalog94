import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';



import Header from '../components/Header';
import Login from '../components/Login';

import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <Header/>
      <IonContent fullscreen>


        <Login/>

      </IonContent>
    </IonPage>
  );
};

export default Tab2;
