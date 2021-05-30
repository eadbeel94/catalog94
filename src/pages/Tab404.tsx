import Header from '../components/Header';

import { 
  IonContent, 
  IonPage
} from '@ionic/react';

import './Tab404.css';

/**
 * Component for showing a message 404 not found
 * @component
 * @returns JSX Element that include a div groups
 */
const Tab404: React.FC = () => {
  return(
    <IonPage>
      <Header/>
      <IonContent fullscreen>
        <div id="Tab404">
          <div>
            
            <blockquote>
              <div className="ion-text-center">
                <h1>PAGE NOT FOUND</h1> 
                <h2>ERROR 404</h2>
              </div>
            </blockquote>

          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab404;