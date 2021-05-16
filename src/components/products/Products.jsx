import Grid from '@material-ui/core/Grid'
import Product from './product/Product'

import img2 from '../../assets/images/msi-carbon.webp'

import useStyles from './styles'

const products = [
    { id: 1, name: 'Asrock B550 Pro4', description: 'Supports AMD Ryzen 5000/ 4000G/ 3000 series cpus', price: '115', image: img2 },
    { id: 2, name: 'MSI B550 Gaming Carbon', description: 'Supports AMD Ryzen 5000/ 4000G/ 3000 series cpus', price: '230', image: img2 },
    { id: 3, name: 'MSI Z490 Gaming Edge', description: 'Intel LGA 1200 socket, supports 11th Gen Intel Core cpus', price: '222', image: img2 },
    { id: 4, name: 'Gigabyte Z590 Aorus Elite', description: 'Intel 1200 socket, supports 11th and 10th Gen Intel Core cpus', price: '230', image: img2 },
]

const Products = () => {
    const classes = useStyles()

    return (
        <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container justify='center' spacing={3}>
                {products.map(product => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} />
                    </Grid>
                ))}
            </Grid>
        </main>
    )
}

export default Products
