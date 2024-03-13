import React from 'react';

const ProductBadge = ({ text, icon, color }) => {
  return (

    <div className='border-2 border-white' style={{ backgroundColor: color, padding: '2px 3px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
      
      {icon && <span>{icon}</span>}

    </div>

  );
};

export default ProductBadge;