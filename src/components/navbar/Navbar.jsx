import { Link, useLocation } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import logo from '../../assets/images/logo.png'

import useStyles from './styles'

const Navbar = ({ cartTotalItems }) => {
    const classes = useStyles()
    const location = useLocation()



    return (
        <>
            <AppBar position='fixed' className={classes.appBar} color='inherit'>
                <Toolbar>
                    <Typography component={Link} to='/' variant='h6' className={classes.title} color='inherit'>
                        <img src={logo} alt='Tech Cart' height='25px' className={classes.image} />
                        Tech Cart
                    </Typography>
                    <div className={classes.grow} />
                    {location.pathname !== '/cart' && (
                        <div className={classes.button}>
                            <IconButton component={Link} to='/cart' aria-label='Show cart items' color='inherit'>
                                <Badge badgeContent={cartTotalItems} color='secondary'>
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
