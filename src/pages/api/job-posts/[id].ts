// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { DocumentData, doc, getDoc } from "firebase/firestore"
import { db } from '../../../firebase'
import Job from '@/interfaces/Job'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Job>
) {
  const { id } = req.query
  const docRef = doc(db, "JobPosts", (id || '') as string)
  const jobPost = await getDoc(docRef)
  let result: Job

  if (jobPost.exists()) {
    const data: DocumentData = jobPost.data()
    result = {
      id: data.id,
      title: data.title,
      company: data.company,
      description: data.description,
      is_active: data.is_active,
      job_responsibilities: data.job_responsibilities,
      applied_date: data.applied_date,
    }
    res.status(200).json(result)
  } else {
    res.status(404)
  }
}
