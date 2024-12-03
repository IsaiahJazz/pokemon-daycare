import React, {createContext, useContext} from 'react'


export const MyContext = createContext();

export const MyContextProvider = ({children}) => {
    const TEST = 'HELLO ISAIAH'


    return(
        <MyContext.Provider value={test}>{children}</MyContext.Provider>
    )
}