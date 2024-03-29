/** @namespace view/AllCards */

import { useState , useEffect } from 'react';

import {
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonRow,
  IonGrid,
  IonLoading,
  IonToast
} from '@ionic/react';

import ModalItem from '../components/ModalItem';
import ItemList from '../components/ItemList';

import { useItem , useShowHide , useMessage } from '../hooks/main';
import { fetchSend , splitRows } from '../js/helper.js';

/**
 * Component for showing all result in three diferents IonList
 * @component
 * @param {object} props Group elements that inicialize this component
 * @param {object} props.cliSelection group data give client
 * @returns JSX Element that include a form
 */
const AllCards: React.FC<{ cliSelection: any }> = ({ cliSelection }) => {

  /** 
   * State variable that enable/disable infinite scroll component
   * @constant scroll-setScroll
   * @type {useState}  
   * @memberof view/AllCards
   */
  const [scroll, setScroll]: [ any , Function ] = useState({ disable: true, pos: 0 });
  /** 
   * State variable that include three arrays, for each array exist objects with information abaout articles
   * @constant items-setItems
   * @type {useState}  
   * @memberof view/AllCards
   */
  const [items, setItems]: [ Array<any> , Function ] = useState([[],[],[]]);
  /** 
   * State variable that is used for show a modal and send vin data to Modal component
   * @constant isCar-openCar-closeCar
   * @type {useState}  
   * @memberof view/AllCards
   */
  const [ isCar, openCar, closeCar ]: any= useItem({ req: false , data: false });
  /** 
   * State variable that is used in loading component
   * @constant isLoading-openLoading-closeLoading
   * @type {useShowHide}  
   * @memberof view/AllCards
   */
  const [ isLoading, openLoading, closeLoading ]: any= useShowHide({ req: false });
  /** 
   * State variable that is used in toast component
   * @constant isToast-setToast-initToast
   * @type {useState}  
   * @memberof view/AllCards
   */
  const [ isToast , setToast , , , initToast ]: any= useMessage({ req: false, mess: "", time: 3000 });
  /**
   * send request to search element into backend
   * @function searchItems
   * @param {string} text criterion word to search elements
   * @param {object} filters object that include filters in search
   * @param {number} page indicate number page
   * @memberof view/AllCards
   */
  const searchItems= async( text: string , filters:object= {} , page:number )=>{
    openLoading();

    const url= `/vehicle/search`;
    const send= { text, filters, page }
    const { stat , data , mess }:any = await fetchSend( url , "POST" , send );

    setToast(mess);
    if(!stat){
      page === 0 && setItems([[],[],[]]);
      page === 0 && setScroll({ disable: true, pos: 0 });
    }else{
      
      let orgList= [];
      if( page === 0 )  orgList= [ ...data ];
      else             orgList= [ ...items[0] , ...items[1] , ...items[2] , ...data ];
      
      setItems( splitRows(orgList) );
      const enable=  orgList.length >= ( ( page + 1 ) * 20 );
      setScroll({ disable: !enable, pos: page });
    }

    setTimeout( ()=>closeLoading() , 350 );
  };
  /**
   * Search element each user enter new word in search component
   * @callback useEffect->CliSelecton-text
   * @memberof view/AllCards
   */
  useEffect(() => {
    if( cliSelection.text.length > 2 )
      searchItems( cliSelection.text , cliSelection.filters , 0 );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cliSelection.text]);
  /**
   * send request to search same creiterio previously but diferent page number based on scroll position
   * @function searchNext
   * @param {Event} ev scroll event each pass threshold
   * @memberof view/AllCards
   */
  const searchNext= async ({ target }:{ target: any }) => {
    const accum= items.length >= 3 && ( items[0].length + items[1].length + items[2].length );
    if( accum >= 20 ){
      searchItems( cliSelection.text , cliSelection.filters , scroll.pos + 1 );
    }
    (target as HTMLIonInfiniteScrollElement).complete();
    return null;
  };
  /**
   * If user change information of any product into Modal component, then update values into items state
   * @function handleUpdate
   * @param {string} operation specify type operation maked into Modal
   * @param {object|string} info specify information to update/delete
   * @memberof view/AllCards
   */
  const handleUpdate= (operation: string, info: any)=>{
    let newList:any = [ ...items ];
    if( operation === "change" )
      newList= newList.map( ( column: [] ) => column.map( ( el : any ) => el._id === info.id ? info : el ));
    else if( operation === "remove" )
      newList= newList.map( ( column: [] ) => column.filter( ( el : any ) => el._id !== info ));
    setItems( newList );
  };

  return(
    <>
      <section id="body">
        <div data-comment="noterase">
          <IonGrid>
            <IonRow className="ion-no-margin">
              {
                items && 
                items.length > 0 && 
                items.map( (colum:any , ind: any) => <ItemList 
                  key= { `item-${ind}` } 
                  colum= { colum } 
                  ind={ ind } 
                  actClick= { openCar } /> 
                )
              }
            </IonRow>
          </IonGrid>

          <IonInfiniteScroll threshold="200px" disabled= { scroll.disable } onIonInfinite={ searchNext }>
            <IonInfiniteScrollContent loadingText="Loading more articles..."> </IonInfiniteScrollContent>
          </IonInfiniteScroll>

        </div>
      </section>

      <ModalItem 
        isOpen={ isCar.req } 
        actClose= { closeCar } 
        vin= { isCar.data } 
        actUpdate= { handleUpdate }
      />

      <IonLoading 
        isOpen={ isLoading } 
        message='PLEASE WAIT!!!...' 
        duration={1000 * 25} 
        onDidDismiss={ closeLoading }
      />

      <IonToast
        isOpen= { isToast.req }
        message= { isToast.mess }
        duration= { isToast.time }
        onDidDismiss= { initToast }
      />

    </>
  );
};

export default AllCards;