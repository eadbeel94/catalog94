/** @namespace view/ButtonD */

import { IonChip, IonLabel, IonButton, IonIcon, IonToast } from '@ionic/react';
import { cloudCircleOutline , cloudDownload } from 'ionicons/icons';

import { useMessage } from '../hooks/main';

/**
 * Component for showing a dowload buttons.
 * @component
 * @returns JSX Element that include a div with a buttons (donwload database option)
 */
const ButtonD: React.FC = () => {
  /** 
   * State variable that is used in toast component
   * @constant isToast-setToast-initToast
   * @type {useMessage}  
   * @memberof view/ButtonD
   */
  const [ isToast , setToast , , , initToast ]: any= useMessage({ req: false, mess: "", time: 3000 });
  /**
   * send request to get file with all information in database into a excel file
   * @function donwload
   * @memberof view/AddUser
   */
  const donwload= async ()=>{
    try {
      const res= await fetch(`http://localhost:3001/api/vehicle/download`,{
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-access-token': localStorage.getItem('logged') || ''
        }
      });

      if( !res.ok ) throw new Error(res.statusText);

      const file= await res.blob();
      const newURL= URL.createObjectURL( file );
      window.open(newURL, "_blank");
    } catch (error) {   setToast(error)   };
  };
  
  return (
    <div className="container-tab2 button-group-UD">
      <IonChip outline color="white">
        <IonIcon icon={cloudCircleOutline} />
        <IonLabel >DOWN DB TO EXCEL FILE</IonLabel>
      </IonChip>
      <br />
      <IonButton 
        type="button" 
        fill='outline' 
        color="secondary"
        onClick={ donwload }
      > 
        <IonIcon icon={cloudDownload} className="ion-padding-end" /> DOWNLOAD
      </IonButton> 

      <IonToast
        isOpen= { isToast.req }
        message= { isToast.mess }
        duration= { isToast.time }
        onDidDismiss= { initToast }
      />
    </div>
  );
};

export default ButtonD;