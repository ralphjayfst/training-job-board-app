// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { auth } from '../../../firebase'


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  auth.signOut().then(() => {
    // Sign-out successful.
    res.status(200).json(true)
  }).catch((error) => {
    // An error happened.
    console.log(error)
    res.status(500).json(false)
  });

}
