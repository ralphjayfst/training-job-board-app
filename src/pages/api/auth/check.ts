// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { DocumentData, doc, getDoc } from "firebase/firestore"
import { db, auth } from '../../../firebase'
import User from '@/interfaces/User'
import { error } from 'console'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // auth.signOut()
  auth.onAuthStateChanged(async (loggedUser) => {
    // Check if user is signed in
    const id = loggedUser?.uid
    if (id) {
      const docRef = doc(db, "Users", (id || '') as string)
      const user = await getDoc(docRef)
      let result: User

      if (user.exists()) {
        const data: DocumentData = user.data()
        result = {
          id: data.id,
          name: data.name,
          role: data.role,
          user: loggedUser,
        }
        res.status(200).json(result)
      }
    } else {
      res.status(401).json(null)
    }
  })
}
