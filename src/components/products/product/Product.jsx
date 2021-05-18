import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import AddShoppingCart from '@material-ui/icons/AddShoppingCart'

import useStyles from './styles'

const Product = ({ product, onAddToCart }) => {
    const classes = useStyles()

    return (
        <Card className={classes.root}>
            <CardMedia image={product.media.source} alt={product.name} className={classes.media} />
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant='h5' gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant='h5' className={classes.cardPrice}>
                        {product.price.formatted_with_symbol}
                    </Typography>
                </div>
                <Typography variant='body2' color='textSecondary' dangerouslySetInnerHTML={{ __html: product.description }} />
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label='Add to Cart' onClick={() => onAddToCart(product.id, 1)}>
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Product
