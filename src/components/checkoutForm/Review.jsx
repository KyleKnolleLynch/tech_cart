import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const Review = ({ checkoutToken }) => {
    return (
        <>
            <Typography variant='h6' gutterBottom>Order Summary</Typography>
            <List disablePadding>
                {checkoutToken.live.line_items.map(item => (
                    <ListItem style={{ padding: '10px 0' }} key={item.name}>
                        <ListItemText primary={item.name} secondary={`Quantity: ${item.quantity}`} />
                        <Typography variant='body2'>{item.line_total.formatted_with_symbol}</Typography>
                    </ListItem>
                ))}
                <ListItem style={{ padding: '10px 0' }}>
                    <ListItemText primary='Total' />
                    <Typography variant='subtitle1' style={{ fontWeight: '600' }}>
                        {checkoutToken.live.subtotal.formatted_with_symbol}
                    </Typography>
                </ListItem>
            </List>
        </>
    )
}

export default Review
