import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { commerce } from './lib/commerce'
import { Products, Navbar, Cart, Checkout } from './components'

const App = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState({})
  const [order, setOrder] = useState({})
  const [errorMessage, setErrorMessage] = useState('')

  const fetchProducts = async () => {
    const { data } = await commerce.products.list()
    setProducts(data)
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve())
  }

  const handleAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity)
    setCart(cart)
  }

  const updateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity })
    setCart(cart)
  }

  const removeFromCart = async productId => {
    const { cart } = await commerce.cart.remove(productId)
    setCart(cart)
  }

  const emptyCart = async () => {
    const { cart } = await commerce.cart.empty()
    setCart(cart)
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh()
    setCart(newCart)
  }

  const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(
        checkoutTokenId,
        newOrder
      )

      setOrder(incomingOrder)
      refreshCart()
    } catch (err) {
      setErrorMessage(err.data.error.message)
    }
  }

  useEffect(() => {
    let mounted = true
    if (mounted) {
    fetchProducts()
    fetchCart()
    }

    return () => {
      mounted = false
    }
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
            render={() => (
              <Cart
                cartItems={cart}
                updateCartQty={updateCartQty}
                removeFromCart={removeFromCart}
                emptyCart={emptyCart}
              />
            )}
          />
          <Route
            exact
            path={'/checkout'}
            render={() => (
              <Checkout
                cart={cart}
                order={order}
                onCaptureCheckout={handleCaptureCheckout}
                error={errorMessage}
              />
            )}
          />
        </Switch>
      </div>
    </Router>
  )
}

export default App
