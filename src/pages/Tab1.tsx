import { useState , useEffect } from 'react';

import { IonContent, IonPage, IonToast  } from '@ionic/react';

import Header from '../components/Header';
import AllCards from '../components/AllCards';
import Search from '../components/Search';
import ModalFilter from '../components/ModalFilter';
import BotonFilter from '../components/BotonFilter';

import { useShowHide , useMessage } from '../hooks/main.jsx';
import { fetchSend } from '../js/helper.js';

import './Tab1.css';

const IP= `http://localhost:3001/api/types`;

const Tab1: React.FC = () => {

  const [ types , setTypes ] = useState([]);
  const [ isFilter, openFilter, closeFilter ]: any= useShowHide({ req: false });

  const [ userSearch , setUserSearch ] = useState({ text: "" , filters: {} });
  const [ isToast , setToast , , , initToast ]: any= useMessage({ req: false, mess: "", time: 1000 });

  const getTypes= async ()=>{
    const url= `${ IP }/getAll`;
    const { stat , data , mess }:any = await fetchSend(url);
    !stat && setToast(mess)
    stat && setTypes(data);
  };

  useEffect(() => {
    getTypes();
  }, [])

  const searchStart= ({ target , keyCode }:any) => {
    if(keyCode === 13) setUserSearch({ ...userSearch , text: target.value });
  };

  const selectStart= (filters: any)=>{
    setUserSearch({ ...userSearch , filters });
  }

  return (
    <IonPage>
      <Header/>
      <IonContent fullscreen>

        <Search onKeyDown={ searchStart } />

        <AllCards cliSelection= { userSearch }/>
        
        <ModalFilter isOpen={ isFilter } types= { types } actClose= { closeFilter } actSelect= { selectStart } />

        <BotonFilter onClick= { openFilter } />

        <IonToast
          isOpen= { isToast.req }
          message= { isToast.mess }
          duration= { isToast.time }
          onDidDismiss= { initToast }
        />
        
      </IonContent>
    </IonPage>
  );
};

export default Tab1;