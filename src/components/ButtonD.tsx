/** @namespace view/ButtonD */
import '@ionic-native/core';

import { IonChip, IonLabel, IonButton, IonIcon, IonToast, IonAlert } from '@ionic/react';
import { cloudCircleOutline , cloudDownload } from 'ionicons/icons';

import { Plugins, FilesystemDirectory as FSD } from '@capacitor/core';
import { FileOpener } from '@ionic-native/file-opener';

import { useMessage , useAlert } from '../hooks/main';
import { fetchSend } from '../js/helper.js';

import XLSX from 'xlsx';

/**
 * Component for showing a dowload buttons.
 * @component
 * @returns JSX Element that include a div with a buttons (donwload database option)
 */
const ButtonD: React.FC = () => {

  /** 
   * State variable that is used in alert component
   * @constant alert-setAlert-initAlert
   * @type {useAlert}  
   * @memberof view/ButtonD
   */
  const [ alert , setAlert ,  ,  ,  initAlert ]:any= useAlert({ req: false , mess: "" , cb: ()=>{} })
  /** 
   * State variable that is used in toast component
   * @constant isToast-setToast-initToast
   * @type {useMessage}  
   * @memberof view/ButtonD
   */
  const [ isToast , setToast , , , initToast ]: any= useMessage({ req: false, mess: "", time: 3000 });
  /**
   * send request to get file using web page
   * @function fetchWeb
   * @memberof view/ButtonD
   */
  const fetchWeb = async ()=>{
    try {
      const url= `/vehicle/getAll`;
      const { stat , data: vehicles , mess , noauth }= await fetchSend( url, undefined, undefined );

      if(stat){
        const wb = XLSX.utils.book_new();
        const ws= XLSX.utils.json_to_sheet( vehicles, { header: ['vin','name','manuf','model','type','fuel','color'] , skipHeader: true } );
        XLSX.utils.book_append_sheet(wb, ws, `Catalog-94_${ Date.now() }`);

        const arrayExcel= await XLSX.write(wb, {bookType:"xlsx", type:'array'});
        const blobExcel= new Blob([new Uint8Array( arrayExcel )], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
        const newURL= URL.createObjectURL( blobExcel );
        window.open(newURL, "_blank");
      }
    } catch (err) {
      setToast(err.message || err.error);
    }
  };
  /**
   * send request to get file using mobile
   * @function fetchMobile
   * @memberof view/ButtonD
   */
  const fetchMobile= async ()=>{
    try {
      const url= `/vehicle/getAll`;
      const { stat , data: vehicles , mess , noauth }= await fetchSend( url, undefined, undefined );

      if(stat){
        const name= `Catalog${ Date.now() }`;
        const wb = XLSX.utils.book_new();
        const ws= XLSX.utils.json_to_sheet( vehicles, { header: ['vin','name','manuf','model','type','fuel','color'] , skipHeader: true } );
        XLSX.utils.book_append_sheet(wb, ws, name);
        //const data= await XLSX.write(wb, {bookType:"xlsx", type:'base64'});

        const { uri } = await Plugins.Filesystem.writeFile({
          path: name + ".xlsx",
          data: await XLSX.write(wb, {bookType:"xlsx", type:'base64'}),
          directory: FSD.External
        });

        setAlert( `Your file was saved on ${ uri } <br/> \n Do you wanna open this file?` , async ()=>{
          await FileOpener.showOpenWithDialog( uri, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' )
          setToast( 'Your file opened successfully' );
        });
        
      }
      /*
      setAlert( `Your file was saved on ${ nativeURL } <br/> \n Do you wanna open this file?` , async ()=>{
        await FileOpener.showOpenWithDialog( nativeURL, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' )
        setToast( 'Your file opened successfully' );
      });
      */
    } catch (err) {
      console.log( 85 , JSON.stringify(err) )
      setToast( 95,  err.message || err.error || JSON.stringify(err));
    }
  };
  /**
   * send request to get file with all information in database into a excel file
   * @function donwload
   * @memberof view/AddUser
   */
  const donwload= async ()=>{
    const { platform }= await Plugins.Device.getInfo();
    if( platform === "web" )  fetchWeb(); 
    else                      fetchMobile();
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
    </div>
  );
};

export default ButtonD;