import { SkynetProvider } from 'lib/skynet'
import { SkyIDProvider } from 'lib/skyid'
import 'styles/index.css'

function MyApp({ Component, pageProps }) {
  return (
    <SkyIDProvider>
      <SkynetProvider>
        <Component {...pageProps} />
      </SkynetProvider>
    </SkyIDProvider>
  )
}

export default MyApp
