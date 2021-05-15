import { useState , useEffect } from 'react';

import {
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonRow,
  IonGrid,
  IonLoading,
  IonToast
} from '@ionic/react';

//import { caretForward } from 'ionicons/icons';

import ModalItem from '../components/ModalItem';
import ItemList from '../components/ItemList';

import { useItem , useShowHide , useMessage } from '../hooks/main.jsx';
import { fetchSend , splitRows } from '../js/helper.js';

const IP= `http://localhost:3001/api/vehicle`;

const AllCards: React.FC<{ cliSelection: any }> = ({ cliSelection }) => {

  const [scroll, setScroll] = useState({ disable: true, pos: 0 });
  const [items, setItems]: Array<any> = useState([[],[],[]]);

  const [ isCar, openCar, closeCar ]: any= useItem({ req: false , data: false });
  const [ isLoading, openLoading, closeLoading ]: any= useShowHide({ req: false });
  const [ isToast , setToast , , , initToast ]: any= useMessage({ req: false, mess: "", time: 1000 });

  const searchItems= async( text: string , filters:object= {} , page:number )=>{
    openLoading();

    const url= `${ IP }/search`;
    const send= { text, filters, page }
    const { stat , data , mess }:any = await fetchSend( url , "POST" , send );

    if(!stat){
      setToast(mess);
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

  useEffect(() => {
    if( cliSelection.text.length > 2 )
      searchItems( cliSelection.text , cliSelection.filters , 0 );
  }, [cliSelection.text]);

  const searchNext= async ({ target }:{ target: any }) => {
    const accum= items.length >= 3 && ( items[0].length + items[1].length + items[2].length );
    if( accum >= 20 ){
      searchItems( cliSelection.text , cliSelection.filters , scroll.pos + 1 );
    }
    (target as HTMLIonInfiniteScrollElement).complete();
    return null;
  };

  const handleUpdate= (operation:any, info: any)=>{
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
                items && items.length > 0 && items.map( (colum:any , ind: any) => <ItemList key= { `item-${ind}` } colum= { colum } ind={ ind } actClick= { openCar } /> )
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