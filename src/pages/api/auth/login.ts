// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { signInWithEmailAndPassword } from "firebase/auth"
import { DocumentData, doc, getDoc } from "firebase/firestore"
import { db, auth } from '../../../firebase'
import User from '@/interfaces/User'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const getUser = async (id: string) => {
    const docRef = doc(db, "Users", (id || '') as string)
    const user = await getDoc(docRef)
    let result: User

    if (user.exists()) {
      const data: DocumentData = user.data()
      result = {
        id: data.id,
        name: data.name,
        role: data.role,
        user: null,
      }
      return result
    } else {
      return null
    }
  }
  if (req.method == 'POST') {
    const { email, password } = req.body

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const { uid } = userCredential.user
        const userData = getUser(uid)
        if (userData) {
          res.status(200).json(userData)
        } else {
          res.status(401).json(null)
        }
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        res.status(errorCode).json(errorMessage)
      })
  }
}
