import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CartItem from './cartItem/CartItem'
import { Link } from 'react-router-dom'

import useStyles from './styles'

const Cart = ({
    cartItems,
    updateCartQty,
    removeFromCart,
    emptyCart
}) => {
    const classes = useStyles()

    const EmptyCart = () => {
        return (
            <Typography variant='h6'>Your cart is currently empty.
                <Link to='/' className={classes.link}> Start shopping for motherboards!</Link></Typography>
        )
    }

    const FilledCart = () => {
        return (
            <>
                <Grid container spacing={3}>
                    {cartItems.line_items.map((item) => (
                        <Grid item key={item.id} xs={12} sm={4}>
                            <CartItem
                                item={item}
                                updateCartQty={updateCartQty}
                                removeFromCart={removeFromCart}
                            />
                        </Grid>
                    ))}
                </Grid>
                <div className={classes.cartDetails}>
                    <Typography variant='h4'>
                        Subtotal: {cartItems.subtotal.formatted_with_symbol}
                    </Typography>
                    <div>
                        <Button onClick={emptyCart} className={classes.emptyButton} size='large' type='button' variant='contained' color='secondary'>Empty Cart</Button>
                        <Button component={Link} to='/checkout' className={classes.checkoutButton} size='large' type='button' variant='contained' color='primary'>Checkout</Button>
                    </div>
                </div>
            </>
        )
    }

    if (!cartItems.line_items) return <Typography variant='subtitle1' className={classes.loadingDiv}>Loading...</Typography>

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant='h3' gutterBottom>My Cart</Typography>
            {cartItems.line_items.length ? <FilledCart /> : <EmptyCart />}
        </Container>
    )
}

export default Cart
