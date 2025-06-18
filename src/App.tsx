import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import RouterComp from './RoutesComp'
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <div className="app-root">
      <Header/>
      <div className="main-content">
        <RouterComp/>
        <ToastContainer position="top-center" autoClose={3000} />
      </div>
      <Footer/>
    </div>
  )
}

export default App
