import MainLayout from '../components/mainLayout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <MainLayout>
       <Component {...pageProps} />
    </MainLayout>
  )
}

export default MyApp
