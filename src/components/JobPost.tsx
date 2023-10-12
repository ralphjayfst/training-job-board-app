import Job from "@/interfaces/Job"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function JobPost({ title, company, description, isActive }: Job) {
  return (
    isActive &&
      <Card sx={{
        maxWidth: "100%",
        backgroundColor: "rgba(var(--card-rgb), 0)",
        color: "rgb(var(--foreground-rgb))"
      }}>
        <CardContent>
          <Typography gutterBottom variant="h3" component="div">
            {title}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {company}
          </Typography>
          <Typography variant="body2" color="white">
            {description}
          </Typography>
        </CardContent>
      </Card>
  );
}