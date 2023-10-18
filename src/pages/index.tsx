import * as React from 'react'
import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import JobPost from '@/components/JobPost'
import JobDetailPopup from '@/components/JobDetailPopup'
import Job from '@/interfaces/Job'
import jobData from '@/pages/api/job-listing.json'
import Grid from '@mui/material/Unstable_Grid2'
import moment from "moment";

const inter = Inter({ subsets: ['latin'] })
let jobs: Job[] = jobData
  .map(j =>
    Object.assign(
      j,
      {
        applied_date: j.applied_date
          ? moment(j.applied_date)
          : null
      }
    )
  )

export default function Home() {
  const defData: Job = {
    title: '',
    company: '',
    description: '',
    isActive: false,
    job_responsibilities: [],
    applied_date: null
  }
  const [jobDetail, setJobDetail] = React.useState<Job>(defData)
  const [open, setOpen] = React.useState<boolean>(false)
  const handleOpen = (jobDetail: Job) => {
    setJobDetail(jobDetail)
    setOpen(true)
  }
  const handleClose = () => setOpen(false)

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
        >
        {
          jobs.map((job, idx) =>
            job.isActive &&
              <div
                key={idx}
                className={styles.card}
              >
                <JobPost
                  job={job}
                  onOpen={handleOpen}
                />
              </div>
          )
        }
        </Grid>
        <JobDetailPopup
          jobDetail={jobDetail}
          open={open}
          closePopup={() => handleClose()}
        />
      </main>
    </>
  )
}
