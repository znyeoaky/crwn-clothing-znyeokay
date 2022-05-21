import './directory.style.scss';
import CategoryItem from '../category-item/category-item.component';

const Directory = ({categories}) => {


  return (

    <div className='directory-container'>
      {
        categories.map((nny) => (
          <CategoryItem key={nny.id} category={nny}/>
        ))
      }
    </div>

  );

};

export default Directory;
