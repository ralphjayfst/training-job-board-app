import * as React from 'react'
import JobDetails from "@/interfaces/Job"
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'
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

type Props = {
  jobDetail: JobDetails;
  open: boolean;
  closePopup: () => any
};

export default function JobDetailPopup({jobDetail, open, closePopup}: Props) {
  return (
    <div>
      <Modal
        open={open}
        onClose={closePopup}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography gutterBottom variant="h5" component="div">
            {jobDetail.title}
          </Typography>
          <Typography gutterBottom variant="subtitle1" component="div">
            {jobDetail.company}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {jobDetail.description}
          </Typography>
          <Typography sx={{ mt: 2 }} component="div">
            Responsibilities:
            <ul style={{ marginLeft: '16px', marginTop: '5px' }}>
            {
              jobDetail.job_responsibilities &&
                jobDetail.job_responsibilities.map((res, idx) =>
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