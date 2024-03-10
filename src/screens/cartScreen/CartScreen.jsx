import React, {useContext} from "react";
import { ThemeContext } from '../../contexts/ThemeContext';

const CartScreen = () => {

  const { theme } = useContext(ThemeContext);

  return (
    <>
      <div className={`flex flex-col w-fit rounded-lg m-4 p-4 gap-4 ${theme.text} ${theme.bgPrimary}`} >
        <p className="m-0 text-xl">Cart Page is coming soon ..</p>
      </div>
    </>
  );
};

export default CartScreen;