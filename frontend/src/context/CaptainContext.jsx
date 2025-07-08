import React, { useState , createContext} from 'react'


export const CaptainDataContext = createContext()

const CaptainContext = ({children}) => {
    const [captain, setCaptain] = useState(null)
    const [isLoadin, setisLoadin] = useState(false)
    const [error, seterror] = useState(null)

    const updateCaptain = (captainData)=>{
        setCaptain(captainData)
    }
    const value={
        captain,
        setCaptain,
        isLoadin,
        setisLoadin,
        error,
        seterror,
        updateCaptain
    }
  return (

    <div>
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
        
    </div>
  )
}

export default CaptainContext