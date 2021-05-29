/** @namespace components/ModalItem */

import { useState , useEffect } from 'react';

import m from 'dayjs';

import { 
  IonModal, 
  IonRow, 
  IonCol, 
  IonButton, 
  IonIcon, 
  IonInput, 
  IonLoading, 
  IonAlert, 
  IonToast 
} from '@ionic/react';
import { create, trash, closeCircle } from 'ionicons/icons';

import { useAlert , useMessage } from '../hooks/main.jsx';
import { fetchSend } from '../js/helper.js';
/** 
 * Common IP for fetch operations
 * @const {string} IP
 * @memberof components/AddItem
 */
const IP= `http://localhost:3001/api/vehicle`;

/**
 * Component for showing a Form with Item values
 * @component
 * @returns JSX Element that include a form
 */
const ModalItem: React.FC<{ isOpen: boolean , actClose: any , vin: string , actUpdate: any }> = (props) => {
  const { isOpen, actClose, vin, actUpdate }: any= props;

  /** 
   * State variable that is used in loading component
   * @constant loading-setLoading
   * @type {useState}  
   * @memberof components/ModalItem
   */
  const [loading, setLoading] = useState(false);
  /** 
   * State variable that show and hide this modal
   * @constant modal-setModal
   * @type {useState}  
   * @memberof components/ModalItem
   */
  const [modal, setModal] = useState(false);
  /** 
   * State variable that include each value into form
   * @constant modal-setModal
   * @type {useState}  
   * @memberof components/ModalItem
   */
  const [car, setCar]: any = useState({});
  /** 
   * State variable that contain a boolean with user login status
   * @constant loading-setLoading
   * @type {useState}  
   * @memberof components/ModalItem
   */
  const [logged, setLogged]= useState(false);
  /** 
   * State variable that is used in toast component
   * @constant isToast-setToast-initToast
   * @type {useMessage}  
   * @memberof components/ModalItem
   */
  const [ isToast , setToast , , , initToast ]: any= useMessage({ req: false, mess: "", time: 1000 });
  /** 
   * State variable that is used in alert component
   * @constant isToast-setToast-initToast
   * @type {useMessage}  
   * @memberof components/ModalItem
   */
  const [ alert , setAlert ,  ,  ,  initAlert ]:any= useAlert({ req: false , mess: "" , cb: ()=>{} })

  /**
   * send request to get item previously required for parent
   * @function getOne
   * @memberof components/ModalItem
   */
  const getOne= async ()=>{
    setLoading(true)
    const url= `${ IP }/getOne/${ vin }`;
    const { data }: any= await fetchSend(url , undefined, undefined);
    setCar( data );
    setLogged( Boolean(localStorage.getItem('username')) );
    setTimeout(() => setLoading(false), 500);
    setTimeout(() => setModal(true), 600);
  };
  /**
   * When user select a item, then show this modal with all information about selection
   * @callback useEffect->getOne
   * @memberof components/ModalItem
   */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { isOpen && getOne() }, [isOpen]);
  /**
   * Close all elements into this modal and also close itself
   * @function closeAll
   * @memberof components/ModalItem
   */
  const closeAll= ()=>{
    setLoading(false);
    setModal(false);
    actClose();
  };
  /**
   * for each change into a input, this value will save into state variable
   * @function handleChange
   * @param {Event} ev user modify any input event
   * @memberof components/ModalItem
   */
  const handleChange= ({ target }:{ target: any }) => {
    setCar({ ...car , [target.name]: target.value });
  };
  /**
   * If user press save button, show a message, if press confirm button then send request to backend for save changes
   * @function editOne
   * @param {Event} ev press save button event
   * @memberof components/ModalItem
   */
  const editOne= (ev:any)=>{
    ev.preventDefault();
    setAlert( "Do you wanna save these changes?" , async ()=>{
      setLoading(true);
      const url= `${ IP }/editOne/${ car._id }`;
      const { stat, mess }: any= await fetchSend( url , 'PUT' , car );

      !stat && setToast(mess);
      stat && actUpdate('change',{
        id: car._id, 
        vin , 
        name: car.name,
        manuf: car.manuf,
        type: car.type,
        fuel: car.fuel
      });

      setTimeout(() => {
        stat && setToast("Element saved successfully");
        setLoading(false);
        stat && setModal(false);
        stat && actClose();
      }, 350);
    });
  };
  /**
   * If user press delete button, show a message, if press confirm button then send request to backend for delete item
   * @function delOne
   * @memberof components/ModalItem
   */
  const delOne= ()=>{
    setAlert( "Do you wanna delete this element?" , async ()=>{

      setLoading(true);
      const url= `${ IP }/deleteOne/${ car._id }`;
      const { stat, mess }: any= await fetchSend( url , 'DELETE' , undefined );

      !stat && setToast(mess);
      stat && actUpdate('remove', car._id );

      setTimeout(() => {
        stat && setToast("Element delete successfully");
        setLoading(false);
        stat && setModal(false);
        stat && actClose();
      }, 350);
    });
  };

  return (
    <>
      <IonModal isOpen={ modal } cssClass="modal-item">
        <section>
          <div>
            <div className="modal-item-title">
              <label>CATALOG M</label>
              <div>
                <IonButton color="dark" fill="outline" onClick= { closeAll } > <IonIcon icon={ closeCircle } /> </IonButton>
              </div>
            </div>
            <div className="modal-item-body">
              
              <form onSubmit= { editOne } >
                <IonRow>

                  <IonCol size="6">
                    <IonInput name="fuel" type='text' value= { car.fuel } disabled= { !logged } onKeyUp= { handleChange } />
                    <span>Fuel</span>
                  </IonCol>
                  <IonCol size="6">
                    <IonInput name="color" type='text' value= { car.color } disabled= { !logged } onKeyUp= { handleChange } />
                    <span>Color</span>
                  </IonCol>

                  <IonCol size="6">
                    <IonInput name="name" type='text' value= { car.name } disabled= { !logged } onKeyUp= { handleChange } />
                    <span>Name</span>
                  </IonCol>
                  <IonCol size="6">
                    <IonInput name="manuf" type='text' value= { car.manuf } disabled= { !logged } onKeyUp= { handleChange } />
                    <span>Manufacture</span>
                  </IonCol>
                  <IonCol size="6">
                    <IonInput name="model" type='text' value= { car.model } disabled= { !logged } onKeyUp= { handleChange } />
                    <span>Model</span>
                  </IonCol>
                  <IonCol size="6">
                    <IonInput name="type" type='text' value= { car.type } disabled= { !logged } onKeyUp= { handleChange } />
                    <span>Type</span>
                  </IonCol>
                  <IonCol size="6">
                    <IonInput name="datec" type='text' value= { m(car.datec).format('H:m DD/MM/YY') } disabled={ !logged } onKeyUp= { handleChange } />
                    <span>D. created</span>
                  </IonCol>
                  <IonCol size="6">
                    <IonInput name="datem" type='text' value= { m(car.datem).format('H:m DD/MM/YY') } disabled={ !logged } onKeyDown= { handleChange } />
                    <span>D. modified</span>
                  </IonCol>

                  {
                    logged && <IonCol size="6">
                      <IonButton type="submit" color="primary" expand="block"> 
                        <IonIcon icon={create} /> SAVE
                      </IonButton> 
                    </IonCol>
                  }
                  {
                    logged && <IonCol size="6">
                      <IonButton type="button" color="danger" expand="block" onClick= { delOne } > 
                        <IonIcon icon={trash} /> DELETE
                      </IonButton>  
                    </IonCol>
                  }

                </IonRow>
              </form>

            </div>
          </div>
        </section>
      </IonModal>

      <IonAlert 
        isOpen={ alert.req } 
        header={'CATALOG M'} 
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

      <IonLoading 
        isOpen={ loading } 
        message='PLEASE WAIT!!!...' 
        duration={1000 * 25} 
        onDidDismiss={ ()=>setLoading(false) }
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

export default ModalItem;
