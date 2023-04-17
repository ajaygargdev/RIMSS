import { createContext } from "react";

const Context = createContext();

export const storeInit = { cart: [], checkoutId: "", searchText: "" };

export default Context;

