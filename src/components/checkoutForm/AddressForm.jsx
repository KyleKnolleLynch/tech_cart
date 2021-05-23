import { useState, useEffect } from 'react'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import { useForm, FormProvider, } from 'react-hook-form'
import FormInput from './CustomTextField'
import { commerce } from '../../lib/commerce'



const AddressForm = ({ proceed, checkoutToken }) => {
    const [shippingStates, setShippingStates] = useState([])
    const [shippingState, setShippingState] = useState('')
    const [shippingOptions, setShippingOptions] = useState([])
    const [shippingOption, setShippingOption] = useState('')
    const methods = useForm()

    const states = Object.entries(shippingStates).map(([code, name]) => ({ id: code, label: name }))
    const options = shippingOptions.map(sO => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` }))
    console.log(shippingOptions)

    const fetchState = async () => {
        const { subdivisions } = await commerce.services.localeListSubdivisions('US')

        setShippingStates(subdivisions)
    }

    const fetchShippingOptions = async (checkoutTokenId, country, region) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region })

        setShippingOptions(options)
        setShippingOption(options[0].id)
    }

    useEffect(() => {
        fetchState()
    }, [])

    useEffect(() => {
        if (shippingState) {
            fetchShippingOptions(checkoutToken.id, 'US', shippingState)
        }
    }, [shippingState, checkoutToken.id])

    return (
        <>
            <Typography variant='h6' gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => proceed({ ...data, shippingState, shippingOption }))}>
                    <Grid container spacing={3}>
                        <FormInput name='firstName' label='First name' />
                        <FormInput name='lastName' label='Last name' />
                        <FormInput name='address' label='Address' />
                        <FormInput name='email' label='Email' />
                        <FormInput name='city' label='City' />
                        <Grid item xs={12} sm={6}>
                            <InputLabel id='stateLabel'>State</InputLabel>
                            <Select labelId='stateLabel' value={shippingState} fullWidth onChange={(e) => setShippingState(e.target.value)}>
                                {states.map(state => (
                                    <MenuItem key={state.id} value={state.id}>{state.label}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <FormInput name='zip' label='Zip' />
                        <Grid item xs={12} sm={6}>
                            <InputLabel id='shippingOptionsLabel'>Shipping Options</InputLabel>
                            <Select labelId='shippingOptionsLabel' value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                                {options.map(option => (
                                    <MenuItem key={option.id} value={option.id}>{option.label}</MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button component={Link} to='/cart' variant='outlined'>Back to Cart</Button>
                        <Button type='submit' variant='contained' color='primary'>Next</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm
