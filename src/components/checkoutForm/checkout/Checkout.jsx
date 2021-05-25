import { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import { Link, useHistory } from 'react-router-dom'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import { commerce } from '../../../lib/commerce'

import useStyles from './styles'

const steps = ['Shipping Address', 'Payment Details']

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
    const classes = useStyles()
    const [activeStep, setActiveStep] = useState(0)
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [shippingData, setShippingData] = useState({})
    const history = useHistory()

    useEffect(() => {
        let mounted = true

        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' })

                setCheckoutToken(token)
            } catch (err) {
                history.push('/')
            }
        }
        if (mounted) {
            generateToken()
        }

        return () => {
            mounted = false
        }
    }, [cart.id, history])

    const nextStep = () => setActiveStep(prevActiveStep => prevActiveStep + 1)

    const backStep = () => setActiveStep(prevActiveStep => prevActiveStep - 1)

    const proceed = data => {
        setShippingData(data)
        nextStep()
    }

    let Confirmation = () => order.customer ? (
        <>
            <div>
                <Typography variant='h5'>
                    Thank you for your order, {order.customer.firstname} {order.customer.lastname}
                </Typography>
                <Divider className={classes.divider} />
                <Typography variant='subtitle2'>
                    Order ref: {order.customer_reference}
                </Typography>
            </div>
            <br />
            <Button component={Link} to='/' variant='outlined' type='button'>Back to Home</Button>
        </>
    ) : (
        <div className={classes.spinner}>
            <CircularProgress />
        </div>
    )

    if (error) {
        <>
            <Typography variant='h5'>
                Error: {error}
            </Typography>
            <br />
            <Button component={Link} to='/' variant='outlined' type='button'>Back to Home</Button>
        </>
    }

    const Form = () => activeStep === 0
        ? <AddressForm proceed={proceed} checkoutToken={checkoutToken} />
        : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} backStep={backStep} nextStep={nextStep} onCaptureCheckout={onCaptureCheckout} />
    return (
        <>
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant='h4' align='center'>
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {steps.map(step => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>
        </>
    )
}

export default Checkout
