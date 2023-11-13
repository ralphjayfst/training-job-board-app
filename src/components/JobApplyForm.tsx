import * as React from 'react'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Unstable_Grid2'
import { Button, Box } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'

export default function JobApplyForm() {
  const [name, setName] = React.useState<string | null>(null)
  const [emailAddress, setEmailAddress] = React.useState<string | null>(null)
  const [reason, setReason] = React.useState<string | null>(null)
  const router = useRouter()
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    if (!name || !emailAddress || !reason) {
      return false
    }
    if (confirm('Are you sure you want to submit?')) {
      router.push({
        pathname: '/job-confirm',
        query: {
          name: name,
          email_address: emailAddress,
          reason: reason,
        },
      })
    }
  }

  return (
    <Box component="form" noValidate autoComplete="off">
      <Typography gutterBottom variant="h6" component="div">
        To apply, please fill up the following information:
      </Typography>
      <Grid
        container
        justifyContent="flex-start"
        alignItems="flex-start"
        rowGap={2}
      >
        <FormControl sx={{ mt: 2, mr: 2, width: 250 }}>
          <InputLabel htmlFor="component-outlined-name-field">Name</InputLabel>
          <OutlinedInput
            id="component-outlined-name-field"
            label="Name"
            value={name}
            error={Boolean(name == '')}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setName(event.target.value)
            }}
          />
          {
            Boolean(name == '') &&
              <FormHelperText error={Boolean(name == '')} sx={{ mx: 0 }}>
                Name is required.
              </FormHelperText>
          }
        </FormControl>
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
        <FormControl sx={{ mt: 0, mr: 10, width: 516 }}>
          <InputLabel htmlFor="component-outlined-email-field">Reason</InputLabel>
          <OutlinedInput
            multiline
            rows={4}
            id="component-outlined-reason-field"
            label="Reason"
            value={reason}
            error={Boolean(reason == '')}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setReason(event.target.value)
            }}
          />
          {
            Boolean(reason == '') &&
              <FormHelperText error={Boolean(reason == '')} sx={{ mx: 0 }}>
                Reason is required.
              </FormHelperText>
          }
        </FormControl>
        <Box>
          <Button
            variant="contained"
            color="success"
            disabled={!name || !emailAddress || !reason}
            onClick={handleClick}
          >
            Submit
          </Button>
        </Box>
      </Grid>
    </Box>
  )
}