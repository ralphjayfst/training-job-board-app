import Job from "@/interfaces/Job"
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { CardActions } from '@mui/material'
import ApplyButton from "./ApplyButton"

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
          <Typography gutterBottom variant="h4" component="div">
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
          <ApplyButton job={job} onOpen={onOpen} />
        </CardActions>
      </Card>
  );
}