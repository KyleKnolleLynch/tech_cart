import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'

import useStyles from './styles'

const CartItem = ({
    item,
    updateCartQty,
    removeFromCart
}) => {
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <CardMedia image={item.media.source} alt={item.name} className={classes.media} />
            <CardContent className={classes.cardContent}>
                <Typography variant='h5'>{item.name}</Typography>
                <Typography variant='h6'>{item.price.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <div className={classes.buttons}>
                    <Button onClick={() => updateCartQty(item.id, item.quantity - 1)} type='button' size='small' className={classes.qtyChange}>-</Button>
                    <Typography variant='h6'>{item.quantity}</Typography>
                    <Button onClick={() => updateCartQty(item.id, item.quantity + 1)} type='button' size='small' className={classes.qtyChange}>+</Button>
                </div>
                <Button onClick={() => removeFromCart(item.id)} variant='contained' type='button' color='secondary'>Remove</Button>
            </CardActions>
        </Card>
    )
}

export default CartItem
