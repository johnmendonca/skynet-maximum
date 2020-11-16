import React, { useState, useEffect, useContext } from 'react'

const SkyIDContext = React.createContext([null, null])

export const SkyIDProvider = (props) => {
  const [skyid, setSkyid] = useState(null)

  return <SkyIDContext.Provider value={[skyid, setSkyid]} {...props} />
}

export const useSkyID = () => {
  const [skyid, setSkyid] = useContext(SkyIDContext)
  const [skyidStatus, setSkyidStatus] = useState(null)
  
  useEffect(() => {
    if (!skyid) {
      console.log('wanta create')
      const script = document.createElement("script")
      script.setAttribute('id', 'skyid-external-script')
      script.src = "https://sky-id.hns.siasky.net/skyid.js"
      script.async = true
      script.onload = () => {
        console.log(script)
        const skyidClient = new SkyID("Note & SkyID",
                                      (message) => setSkyidStatus(message),
                                      { devMode: !!process.env.NEXT_PUBLIC_DEVELOPMENT })
        window.SkyIDIns = skyidClient
        setSkyid(skyidClient)
      }

      document.body.appendChild(script)

      return () => {
        const script = document.getElementById('skyid-external-script')
        console.log('wanna clean', script)
        document.body.removeChild(script)
      }
    }
  }, [])

  return [skyid, skyidStatus]
}
