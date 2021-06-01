import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonAlert
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { reorderFour , person } from 'ionicons/icons';
import { Plugins } from '@capacitor/core';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab404 from './pages/Tab404';

import { useAlert } from './hooks/main';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/**
 * Component for showing Main Body
 * @component
 * @returns JSX Element that include Tab 1 and Tab2 body
 */
const App: React.FC = () => {
  /** 
   * State variable that is used in alert component
   * @constant isToast-setToast-initToast
   * @type {useMessage}  
   * @memberof view/ModalItem
   */
   const [ alert , setAlert ,  ,  ,  initAlert ]:any= useAlert({ req: false , mess: "" , cb: ()=>{} })
  document.addEventListener('ionBackButton', () => setAlert("Do you wanna app exit?" ,()=>{
    Plugins.App.exitApp();
  }));

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/tab1">
              <Tab1 />
            </Route>
            <Route exact path="/tab2">
              <Tab2 />
            </Route>
            <Route exact path="/">
              <Redirect to="/tab1" />
            </Route>
            <Route>
              <Tab404 />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/tab1">
              <IonIcon icon={reorderFour} />
              <IonLabel>Search Items</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2">
              <IonIcon icon={person} />
              <IonLabel>Manage Items</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>

      <IonAlert 
        isOpen={ alert.req } 
        header={'CATALOG 94'} 
        onDidDismiss={ initAlert }
        message= { alert.mess }
        buttons={[
          {
            text: 'CANCEL', role: 'cancel'
          },{
            text: 'CONFIRM', handler: alert.cb
          }
        ]}
      />
    </IonApp>
  );
};

export default App;
