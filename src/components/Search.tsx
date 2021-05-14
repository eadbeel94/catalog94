import { IonCard, IonSearchbar } from '@ionic/react';

//import {  } from 'ionicons/icons';

const Search: React.FC<{ onKeyDown: any }> = ({ onKeyDown }) => {
  return (
    <div className="containerCard">
      <IonCard color="medium" style={{ borderRadius: "0" }}>
        <IonSearchbar style={{ padding: "0.25rem" }} color="light" onKeyDown={ onKeyDown } ></IonSearchbar>
      </IonCard>
    </div>
  );
};

export default Search;







