import React, { useState, useEffect, useContext } from 'react'
import { SkynetClient } from 'skynet-js'

const SkynetContext = React.createContext([null, null])

export const SkynetProvider = (props) => {
  const [skynet, setSkynet] = useState(null)

  return <SkynetContext.Provider value={[skynet, setSkynet]} {...props} />
}

export const useSkynet = () => {
  const [skynet, setSkynet] = useContext(SkynetContext)
  
  useEffect(() => {
    if (!skynet) {
      if (process.env.NEXT_PUBLIC_DEVELOPMENT) {
        setSkynet(new SkynetClient("https://siasky.net"))
      } else {
        setSkynet(new SkynetClient())
      }
    }
  }, [])

  return skynet
}
