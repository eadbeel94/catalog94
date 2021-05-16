import { IonCard, IonSearchbar } from '@ionic/react';

/**
 * Component for showing a search bar
 * @component
 * @returns JSX Element that include a form
 */
const Search: React.FC<{ onKeyDown: any }> = ({ onKeyDown }) => {
  return (
    <div className="containerCard">
      <IonCard color="medium" >
        <IonSearchbar color="light" onKeyDown={ onKeyDown } ></IonSearchbar>
      </IonCard>
    </div>
  );
};

export default Search;







