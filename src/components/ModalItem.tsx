import { useState , useEffect } from 'react';

import m from 'dayjs';

import { IonModal, IonRow, IonCol, IonButton, IonIcon, IonInput , IonLoading } from '@ionic/react';
import { create, trash, closeCircle } from 'ionicons/icons';

import { fetchSend } from '../js/helper.js';

const ModalItem: React.FC<{ isOpen: boolean , actClose: any , vin: string }> = ({ isOpen, actClose, vin }) => {

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [car, setCar]: any = useState({})

  const getOne= async ( num= "" )=>{
    setLoading(true)
    const url= `http://localhost:3001/api/vehicle/getOne?vin=${ num }`;
    const { data }: any= await fetchSend(url);
    setCar( data );
    setTimeout(() => setLoading(false), 500);
    setTimeout(() => setModal(true), 600);
  }

  useEffect(() => { isOpen && getOne( vin ) }, [isOpen]);

  const closeAll= ()=>{
    setLoading(false);
    setModal(false);
    actClose();
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
              
              <form>
                <IonRow>

                  <IonCol size="4">
                    <IonInput type='text' value={ car.vin }></IonInput>
                    <span>ID</span>
                  </IonCol>
                  <IonCol size="4">
                    <IonInput type='text' value={ car.fuel } ></IonInput>
                    <span>Fuel</span>
                  </IonCol>
                  <IonCol size="4">
                    <IonInput type='text' value={ car.color } ></IonInput>
                    <span>Color</span>
                  </IonCol>

                  <IonCol size="6">
                    <IonInput type='text' value={ car.name } ></IonInput>
                    <span>Name</span>
                  </IonCol>
                  <IonCol size="6">
                    <IonInput type='text' value={ car.manuf } ></IonInput>
                    <span>Manufacture</span>
                  </IonCol>
                  <IonCol size="6">
                    <IonInput type='text' value={ car.model } ></IonInput>
                    <span>Model</span>
                  </IonCol>
                  <IonCol size="6">
                    <IonInput type='text' value={ car.type } ></IonInput>
                    <span>Type</span>
                  </IonCol>
                  <IonCol size="6">
                    <IonInput type='text' value={ m(car.datec).format('H:m DD/MM/YY') } ></IonInput>
                    <span>D. created</span>
                  </IonCol>
                  <IonCol size="6">
                    <IonInput type='text' value={ m(car.datem).format('H:m DD/MM/YY') } ></IonInput>
                    <span>D. modified</span>
                  </IonCol>

                  <IonCol size="6">
                    <IonButton type="submit" color="primary" expand="block" > 
                      <IonIcon icon={create} /> SAVE
                    </IonButton> 
                  </IonCol>
                  <IonCol size="6">
                    <IonButton type="button" color="danger" expand="block" > 
                      <IonIcon icon={trash} /> DELETE
                    </IonButton>  
                  </IonCol>

                </IonRow>
              </form>

            </div>
          </div>
        </section>

      </IonModal>

      <IonLoading isOpen={ loading } message='PLEASE WAIT!!!...' duration={1000 * 25} onDidDismiss={ ()=>setLoading(false) }/>

    </>
  );
};

export default ModalItem;
