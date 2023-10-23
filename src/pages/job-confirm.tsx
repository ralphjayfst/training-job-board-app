import * as React from 'react'
import { useRouter } from 'next/router'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'

export default function JobConfirmPage() {
  const router = useRouter()
  const query = router.query
  return (
    <>
      <Box sx={{ width: '100%', maxWidth: 500 }}>
        <Typography variant="h5">
          Thank you for applying <Box fontWeight='fontWeightMedium' display='inline'>{query.name}</Box>, we will send you more details at <Box fontWeight='fontWeightMedium' display='inline'>{query.email_address}</Box>.
          Just to recap this is the reason that you gave on why we should hire you: <Box fontWeight='fontWeightMedium' display='inline'>{query.reason}</Box>
        </Typography>
      </Box>
    </>
  )
}