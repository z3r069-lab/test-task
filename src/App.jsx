//import axios from 'axios'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Main } from './pages'



const App = () => {
  return (
    <main className=''>
      <Router>
        <Routes>
          <Route path="/" element={<Main/>}/>        
        </Routes>
      </Router>
    </main>
  )
  
}




export default App
