import { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'
import { commerce } from '../../../lib/commerce'

import useStyles from './styles'

const steps = ['Shipping Address', 'Payment Details']

const Checkout = ({ cart }) => {
    const classes = useStyles()
    const [activeStep, setActiveStep] = useState(0)
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [shippingData, setShippingData] = useState({})

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' })

                setCheckoutToken(token)
            } catch (err) {
                console.log(err)
            }
        }
        generateToken()
    }, [cart.id])

    const nextStep = () => setActiveStep(prevActiveStep => prevActiveStep + 1)

    const backStep = () => setActiveStep(prevActiveStep => prevActiveStep - 1)

    const next = data => {
        setShippingData(data)
        nextStep()
    }
   
    const Confirmation = () => (
        <div>Confirmation</div>
    )

    const Form = () => activeStep === 0
        ? <AddressForm next={next} checkoutToken={checkoutToken} />
        : <PaymentForm />
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
