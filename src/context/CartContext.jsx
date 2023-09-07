import { createContext, useState } from "react";

export const CartContext = createContext();

const CartContextComponent = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItem = (product) => {
    let existe = cart.some((elemento) => elemento.id === product.id);

    if (existe) {
      let nuevoCart = cart.map((elemento) => {
        if (elemento.id === product.id) {
          return { ...elemento, quantity: product.quantity };
        } else {
          return elemento;
        }
      });
      setCart(nuevoCart);
    } else {
      setCart([...cart, product]);
    }
  };

  const getQuantityById = (id) => {
    let product = cart.find((elemento) => elemento.id === id);
    return product?.quantity;
  };

  const clearCart = () => {
    setCart([]);
  };

  const deleteById = (id) => {
    let nuevoCart = cart.filter((elemento) => elemento.id !== id);
    setCart(nuevoCart);
  };

  const getTotalPrice = () => {
    let total = cart.reduce((acumulador, elemento) => {
      return acumulador + elemento.unit_price * elemento.quantity;
    }, 0);
    return total;
  };

  let data = {
    cart,
    addItem,
    getQuantityById,
    clearCart,
    deleteById,
    getTotalPrice
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

export default CartContextComponent;
