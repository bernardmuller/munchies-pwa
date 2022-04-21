import '../styles/globals.css'
import type { AppProps } from 'next/app'

import { 
  ActiveViewContext,
  ActiveViewProvider
} from "contexts/ActiveViewContext";

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ActiveViewProvider>
      <Component {...pageProps} />
    </ActiveViewProvider>
  )
}

export default MyApp
