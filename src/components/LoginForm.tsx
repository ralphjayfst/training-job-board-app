import * as React from 'react'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Unstable_Grid2'
import { Button, Box, Modal } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'

type UserCredential = {
  email: string;
  password: string
}

type Props = {
  open: boolean;
  closePopup: () => unknown;
  toLogin: (creds: UserCredential) => unknown
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: "background.paper",
  color: "black",
  border: '2px solid #fff',
  boxShadow: 24,
  p: 4,
  maxWidth: "100%"
};

export default function LoginForm({open, closePopup, toLogin}: Props) {
  const [emailAddress, setEmailAddress] = React.useState<string | null>(null)
  const [password, setPassword] = React.useState<string | null>(null)
  const router = useRouter()
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    if (!emailAddress || !password) {
      setEmailAddress('')
      setPassword('')
      return false
    }

    toLogin({
      email: emailAddress,
      password: password,
    })
  }

  return (
    <>
      <Modal
        open={open}
        onClose={closePopup}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" noValidate autoComplete="off">
          <Typography gutterBottom variant="h6" component="div">
            To login, please fill up the following information:
          </Typography>
          <Grid
            container
            justifyContent="flex-start"
            alignItems="flex-start"
            direction="column"
          >
            <FormControl sx={{ mt: 2, mr: 10, width: 250 }}>
              <InputLabel htmlFor="component-outlined-email-field">Email Address</InputLabel>
              <OutlinedInput
                id="component-outlined-email-field"
                label="Email Address"
                value={emailAddress}
                error={Boolean(emailAddress == '')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setEmailAddress(event.target.value)
                }}
              />
              {
                Boolean(emailAddress == '') &&
                  <FormHelperText error={Boolean(emailAddress == '')} sx={{ mx: 0 }}>
                    Email Address is required.
                  </FormHelperText>
              }
            </FormControl>
            <FormControl sx={{ mt: 2, mr: 10, width: 250 }}>
              <InputLabel htmlFor="component-outlined-email-field">Password</InputLabel>
              <OutlinedInput
                id="component-outlined-password-field"
                label="Password"
                type="password"
                value={password}
                error={Boolean(password == '')}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(event.target.value)
                }}
              />
              {
                Boolean(password == '') &&
                  <FormHelperText error={Boolean(password == '')} sx={{ mx: 0 }}>
                    Password is required.
                  </FormHelperText>
              }
            </FormControl>
            <FormControl sx={{ mt: 2, mr: 10 }}>
              <Button
                variant="contained"
                color="success"
                onClick={handleClick}
              >
                Login
              </Button>
            </FormControl>
          </Grid>
        </Box>
      </Modal>
    </>
  )
}