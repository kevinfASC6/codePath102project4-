import React from 'react';

function DogInfo({ name, life_span, breed_group, onBanned }) {
  const handleClick = (attribute) => () => {
    onBanned(attribute === 'name' ? name : attribute === 'life_span' ? life_span : breed_group);
  };

  return (
    <div className='Doginfo'> 
      <p onClick={handleClick('name')}>{name}</p>
      <p onClick={handleClick('life_span')}>{life_span}</p>
      <p onClick={handleClick('breed_group')}>{breed_group}</p>
    </div>
  );
}

export default DogInfo;
