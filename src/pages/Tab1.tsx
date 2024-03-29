/** @namespace view/Tab1 */

import { useState , useEffect } from 'react';

import { IonContent, IonPage, IonToast  } from '@ionic/react';

import Header from '../components/Header';
import AllCards from '../components/AllCards';
import Search from '../components/Search';
import ModalFilter from '../components/ModalFilter';
import ButtonFilter from '../components/ButtonFilter';

import { useShowHide , useMessage } from '../hooks/main';
import { fetchSend } from '../js/helper.js';

import './Tab1.css';

/**
 * Component for showing search items body
 * @component
 * @returns JSX Element that include Tab 1 body
 */
const Tab1: React.FC = () => {

  /** 
   * State variable that include all list elements
   * @constant types-setTypes
   * @type {useState}  
   * @memberof view/Tab1
   */
  const [ types , setTypes ] = useState([]);
  /** 
   * State variable that include show and hide methods for modal element
   * @constant isFilter-openFilter-closeFilter
   * @type {useShowHide}  
   * @memberof view/Tab1
   */
  const [ isFilter, openFilter, closeFilter ]: any= useShowHide({ req: false });
  /** 
   * State variable where storage user search
   * @constant userSearch-setUserSearch
   * @type {useState}  
   * @memberof view/Tab1
   */
  const [ userSearch , setUserSearch ] = useState({ text: "" , filters: {} });
    /** 
   * State variable that include show and hide methods for toast component
   * @constant isToast-setToast-initToast
   * @type {useMessage}  
   * @memberof view/Tab1
   */
  const [ isToast , setToast , , , initToast ]: any= useMessage({ req: false, mess: "", time: 3000 });
  /**
   * send request to get all types words
   * @function getTypes
   * @memberof view/Tab1
   */
  const getTypes= async ()=>{
    const url= `/types/getAll`;
    const { stat , data , mess }:any = await fetchSend(url,undefined,undefined);
    //console.log( 68 , stat , data , mess )
    !stat && setToast(mess)
    stat && setTypes(data);
  };
  /**
   * Get all items types each init the page
   * @callback useEffect->getTypes
   * @memberof view/Tab1
   */
  useEffect(() => {
    getTypes();
  }, [])
  /**
   * If user insert a word in serach bar, then this value will save into state variable
   * @function searchStart
   * @param {Event} ev Key down pressed event in search bar
   * @memberof view/Tab1
   */
  const searchStart= ({ target , keyCode }:any) => {
    if(keyCode === 13) setUserSearch({ ...userSearch , text: target.value });
  };
  /**
   * Get types selection from modal component and update state variable
   * @function selectStart
   * @param {object} filters 
   * @memberof view/Tab1
   */
  const selectStart= (filters: object)=>{
    setUserSearch({ ...userSearch , filters });
  };

  return (
    <IonPage>
      <Header/>
      <IonContent fullscreen>

        <Search onKeyDown={ searchStart } />

        <AllCards cliSelection= { userSearch }/>
        
        <ModalFilter isOpen={ isFilter } types= { types } actClose= { closeFilter } actSelect= { selectStart } />

        <ButtonFilter onClick= { openFilter } />

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