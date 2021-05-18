import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(() => ({
  root: {
    maxWidth: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  media: {
    aspectRatio: '16 / 9',
    paddingTop: '5em',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardPrice: {
    paddingLeft: '0.5em',
  },
  cardActions: {
    alignSelf: 'flex-end',
    marginTop: 'auto',
  },
}))
