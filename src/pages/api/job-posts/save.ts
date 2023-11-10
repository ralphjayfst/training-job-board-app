// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { collection, doc, addDoc, updateDoc } from "firebase/firestore"
import { db } from '../../../firebase'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body
  const data = req.body

  if (!id && req.method == 'POST') {
    await addDoc(collection(db, "JobPosts"), data)
      .then(() => {
        res.status(200)
      })
      .catch((e) => {
        console.log(e)
        res.status(500)
      })
  } else if (id) {
    const docRef = doc(db, "JobPosts", (id || '') as string)
    await updateDoc(docRef, data)
      .then(() => {
        res.status(200)
      })
      .catch((e) => {
        console.log(e)
        res.status(500)
      })
  }
}
