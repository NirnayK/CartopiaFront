"use client";

type Cart = string[];

export const getLocalStoreCart = (): Cart => {
  if (typeof window !== "undefined") {
    // Access local storage only on the client-side
    if (localStorage.getItem("cart") === null) {
      setLocalStoreCart([]);
    }

    let cart = localStorage.getItem("cart");

    if (cart) {
      return JSON.parse(cart);
    } else {
      return [];
    }
  } else {
    // Server-side behavior
    // Return an empty cart or retrieve it from a server-side storage mechanism
    return [];
  }
};

export const setLocalStoreCart = (cart: Cart): void => {
  if (typeof window !== "undefined") {
    // Update local storage only on the client-side
    localStorage.setItem("cart", JSON.stringify(cart));
  } else {
    // Server-side behavior
    // Store the cart in a server-side storage mechanism
  }
};

export const addToCart = (ids: string[]): void => {
  let cart = getLocalStoreCart();
  cart.push(...ids);
  setLocalStoreCart(cart);
};

export const removeFromCart = (id: string): void => {
  let cart = getLocalStoreCart();
  cart = cart.filter((itemId) => itemId !== id);
  setLocalStoreCart(cart);
};

export const clearCart = (): void => {
  setLocalStoreCart([]);
};

export const GetLocalStoreCartCount = (): JSX.Element => {
  let cart = getLocalStoreCart();
  return <p className="text-2xl">{cart.length}</p>;
};
