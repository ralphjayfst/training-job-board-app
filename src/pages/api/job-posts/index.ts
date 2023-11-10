// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { collection, getDocs } from "firebase/firestore"
import { db } from '../../../firebase'
import Job from '@/interfaces/Job'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Job[]>
) {
  const jobPosts = await getDocs(collection(db, "JobPosts"))
  let results: Job[] = []
  jobPosts.forEach(job => {
    const {
      title,
      company,
      description,
      is_active,
      job_responsibilities,
      applied_date,
    } = job.data()
    results.push({
      id: job.id,
      title,
      company,
      description,
      is_active,
      job_responsibilities,
      applied_date
    })
  })
  res.status(200).json(results)
}
