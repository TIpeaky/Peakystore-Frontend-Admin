import { Dashboard } from '@mui/icons-material'
import { Route, Routes, useNavigate } from 'react-router-dom'
import LoginAdmin from '../pages/Login'
import ProductCrud from '../pages/product_crud/ProductCrud'
import PaginaBaseAdmin from "../pages/PageBase"
import NotFound from '../pages/NotFound'
import { useEffect } from 'react'


const Rotas = () => {
  let navigate = useNavigate()

  useEffect(() => {
    navigate('/admin')
  }, []);

  return (
    <Routes>
      <Route path='/admin'>
        <Route path='login' element={<LoginAdmin />} />
      </Route>
      <Route path='/admin' element={<PaginaBaseAdmin />} >
        <Route path='' element={<Dashboard />} />
        <Route path='products' element={<ProductCrud />} />
        <Route path='*' element={<NotFound />} />
      </Route>
      
    </Routes>);
}

export default Rotas