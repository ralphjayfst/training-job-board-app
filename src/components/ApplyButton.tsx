import Job from "@/interfaces/Job"
import { Button } from '@mui/material'
import Moment from 'react-moment'
import Typography from '@mui/material/Typography'

type Props = {
  job: Job;
  onOpen: (jobDetail: Job) => unknown
}

export default function ApplyButton({ job, onOpen }: Props) {
  if (Boolean(job.applied_date !== null)) {
    return (
      job.applied_date &&
        <Typography
          variant="subtitle2"
          sx={{
            fontStyle: 'italic',
            mb: 2,
            color: "rgb(var(--foreground-rgb))",
          }}
        >
          Date applied at <Moment date={job.applied_date} format="MM/DD/YYYY" />
        </Typography>
    )
  }
  return (
    <Button
      variant="contained"
      onClick={() => onOpen(job)}
    >
      Apply
    </Button>
  )
}