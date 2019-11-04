const styles = theme => ({
  mainDiv: {
    backgroundColor: '#171824',
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='64' viewBox='0 0 32 64' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 28h20V16h-4v8H4V4h28v28h-4V8H8v12h4v-8h12v20H0v-4zm12 8h20v4H16v24H0v-4h12V36zm16 12h-4v12h8v4H20V44h12v12h-4v-8zM0 36h8v20H0v-4h4V40H0v-4z' fill='%23000000' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
    minHeight: '100vh',
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  box: {
    backgroundColor: 'black',
    color:'white',
    margin: 'auto',
    maxWidth: '450px',
    borderRadius: '20px',
  },
  agryoLogo: {
    width: '200px',
    height: '100px',
  },
  buttonConfirm: {
    textTransform: 'none',
    backgroundColor: '#67666f',
    color: 'white',
    '&:hover': {
      backgroundColor: '#43414d',
    },
  },
  bootstrapFormLabel: {
    fontSize: 18,
    color:'white',
    '&:focus': {},
  },
  bootstrapRoot: {
    'label + &': {
      marginTop: theme.spacing.unit * 2.5,
    },
  },
  bootstrapInput: {
    borderRadius: 8,
    backgroundColor: '#5b605838',
    color: 'white',
    border: '1px solid #ced4da',
    fontSize: 10,
    height: '1.6875em',
    width: '250px',
    padding: '5px 6px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
  },
  boxError: {
    backgroundColor: '#f1d0cc',
    maxWidth: 250,
    padding: 15,
    borderRadius: 8
  },
  boxSecondary: {
    backgroundColor: '#ccccff',
    maxWidth: 250,
    padding: 15,
    borderRadius: 8
  },
  blocknotalLogo:{
    margin: 10
  }
})

export default styles
