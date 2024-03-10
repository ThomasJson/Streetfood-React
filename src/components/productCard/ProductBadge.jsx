import React from 'react';

const ProductBadge = ({ text, icon, color }) => {
  return (

    <div style={{ backgroundColor: color, padding: '2px 5px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '5px' }}>
      
      {icon && <span>{icon}</span>}
      {/* <span className='text-sm'>{text}</span> */}

    </div>

  );
};

export default ProductBadge;