import { createContext, useState } from "react";



export const ContextInput = createContext();

const ContextInputProvider = ({ children }) => {

    const amount = 1500;
    return(
        <ContextInput.Provider value={{amount}}>
            {children}
        </ContextInput.Provider>
    )

}
export default ContextInputProvider;