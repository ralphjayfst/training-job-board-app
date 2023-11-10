import Job from "@/interfaces/Job"
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Box, CardActions, IconButton } from '@mui/material'
import ApplyButton from "./ApplyButton"
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material"
import { useRouter } from "next/router"

type Props = {
  job: Job;
  role: string | null | undefined;
  onOpen: (jobDetail: Job) => any
}

export default function JobPost({job, role, onOpen}: Props) {
  const router = useRouter()
  const delJob = (job: Job) => {
    // make job post inactive
    job.is_active = false

    // saving
    if (confirm('Are you sure want to delete?')) {
      fetch('/api/job-posts/save', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(job),
      }).then(res => {
        console.log(res.json())
      })
      router.reload()
    }
  }
  return (
    job.is_active &&
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
          {
            (role == 'applicant' || !role)
              && <ApplyButton job={job} onOpen={onOpen} />
          }
          {
            role == 'employer' &&
              <Box component='div' sx={{ ml: 'auto' }}>
                <IconButton
                  aria-label="edit"
                  onClick={() => router.push(`/jobs/${job.id}`)}
                  sx={{
                    color: 'white',
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  color="error"
                  onClick={() => delJob(job)}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
          }
        </CardActions>
      </Card>
  );
}