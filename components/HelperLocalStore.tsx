"use client";
import { useState } from "react";
type Cart = Record<string, number>;

export const getLocalStoreCart = (): Cart => {
  if (typeof window !== "undefined") {
    // Access local storage only on the client-side
    if (localStorage.getItem("cart") === null) {
      console.log("cart is null");
      setLocalStoreCart({});
    }
    console.log("cart is not null");
    let cart = localStorage.getItem("cart");

    if (cart) {
      console.log(cart);
      return JSON.parse(cart);
    } else {
      return {};
    }
  } else {
    console.log("server side");
    // Server-side behavior
    // Return an empty cart or retrieve it from a server-side storage mechanism
    return {};
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

export const addToCart = (id: string, count: number): void => {
  console.log("adding to cart");
  console.log(id);
  console.log(count);
  let cart = getLocalStoreCart();
  cart[id] = (cart[id] || 0) + count;
  setLocalStoreCart(cart);
  console.log(cart);
};

export const removeFromCart = (id: string): void => {
  let cart = getLocalStoreCart();
  delete cart[id];
  setLocalStoreCart(cart);
};

export const clearCart = (): void => {
  setLocalStoreCart({});
};

export const GetLocalStoreCartCount = (): JSX.Element => {
  let cart = getLocalStoreCart();
  const totalItems = Object.values(cart).reduce(
    (total, quantity) => total + quantity,
    0
  );
  return <p className="text-xl">{totalItems}</p>;
};
