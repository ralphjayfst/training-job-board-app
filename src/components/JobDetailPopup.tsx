import * as React from 'react'
import JobDetails from "@/interfaces/JobDetails"
import Typography from '@mui/material/Typography'
import Moment from 'react-moment'
import { Button, Box } from '@mui/material'
import Modal from '@mui/material/Modal'

const style = {
  position: 'absolute' as 'absolute',
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

export default function JobDetailPopup({ title, company, description, job_responsibilities, applied_date }: JobDetails) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button size="small" variant="contained" disabled={Boolean(applied_date !== null)} onClick={handleOpen}>
        Apply
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography gutterBottom variant="subtitle1" component="div">
            {company}
          </Typography>
          {
            applied_date &&
              <Typography variant="subtitle2" sx={{ fontStyle: 'italic', mb: 2 }}>
                Date applied at <Moment date={applied_date} format="MM/DD/YYYY" />
              </Typography>
          }
          <Typography variant="body1" gutterBottom>
            {description}
          </Typography>
          <Typography sx={{ mt: 2 }} component="div">
            Responsibilities:
            <ul style={{ marginLeft: '16px', marginTop: '5px' }}>
            {
              job_responsibilities.map((res, idx) =>
                <li key={idx}>{res}</li>
              )
            }
            </ul>
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}