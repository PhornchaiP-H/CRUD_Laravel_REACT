import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import { Navbar, Container, Row, Col } from 'react-bootstrap'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'

import ProductList from './components/ProductList';
import CreateProduct from './components/CreateProduct';
import EditProduct from './components/EditProduct';



function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Navbar bg='primary'>
        <Container>
          <Link to={"/"} className="navbar-brand text-white">
            React & Laravel CRUD APP
          </Link>
        </Container>
      </Navbar>
      <Container className='mt-5'>
        <Col md={12}>
          <Routes>
            <Route exact path="/" element={<ProductList />} />
            <Route path="/product/create" element={<CreateProduct />} />
            <Route path="/product/edit/:id" element={<EditProduct />} />
          </Routes>
        </Col>
      </Container>

    </Router>
       
  )
}

export default App
