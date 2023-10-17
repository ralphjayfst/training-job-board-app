import Job from "@/interfaces/Job"
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Button, CardActions } from '@mui/material'

type Props = {
  job: Job;
  onOpen: (jobDetail: Job) => any
}

export default function JobPost({job, onOpen}: Props) {
  return (
    job.isActive &&
      <Card sx={{
        maxWidth: "100%",
        backgroundColor: "rgba(var(--card-rgb), 0)",
        color: "rgb(var(--foreground-rgb))"
      }}>
        <CardContent>
          <Typography gutterBottom variant="h3" component="div">
            {job.title}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {job.company}
          </Typography>
          <Typography variant="body2" color="white">
            {job.description}
          </Typography>
        </CardContent>
        <CardActions sx={{ pl: 2 }}>
          <Button
            size="small"
            variant="contained"
            disabled={Boolean(job.applied_date !== null)}
            onClick={() => onOpen(job)}
          >
            Apply
          </Button>
        </CardActions>
      </Card>
  );
}