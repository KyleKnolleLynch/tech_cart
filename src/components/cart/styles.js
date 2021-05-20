import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  title: {
    textAlign: 'center',
    marginTop: '1em',
  },
  cartDetails: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    margin: '2em 0',
  },
  emptyButton: {
    minWidth: '150px',
    [theme.breakpoints.up('xs')]: {
      marginRight: '20px',
    },
  },
  checkoutButton: {
    minWidth: '150px',
  },
  loadingDiv: {
    marginTop: '12vh',
    textAlign: 'center',
  },
  link: {
    fontSize: '1.1em',
    fontWeight: '600',
    color: 'rgb(0, 110, 220)',
    [theme.breakpoints.down('xs')]: {
      fontSize: '1em',
      display: 'block',
    },
  },
}))
