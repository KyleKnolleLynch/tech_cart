import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { commerce } from './lib/commerce'
import { Products, Navbar, Cart } from './components'

const App = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})

  const fetchProducts = async () => {
    const { data } = await commerce.products.list()
    setProducts(data)
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve())
  }

  const handleAddToCart = async (productId, qty) => {
    const item = await commerce.cart.add(productId, qty)
    setCart(item.cart)
  }

  useEffect(() => {
    fetchProducts()
    fetchCart()
  }, [])

  return (
    <Router>
      <div>
        <Navbar cartTotalItems={cart.total_items} />
        <Switch>
          <Route
            exact
            path={'/'}
            render={() => (
              <Products products={products} onAddToCart={handleAddToCart} />
            )}
          />
          <Route
            exact
            path={'/cart'}
            render={() => <Cart cartItems={cart} />}
          />
        </Switch>
      </div>
    </Router>
  )
}

export default App
