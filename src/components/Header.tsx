import * as React from 'react'
import { Typography, Button, Box } from '@mui/material'
import { useRouter } from 'next/router'
import { auth } from '@/firebase'
import LoginForm from './LoginForm'
import UserObj from '@/interfaces/User'

type Props = {
  userObj: UserObj | null
}

type UserCredential = {
  email: string;
  password: string
}

export default function Header({ userObj }: Props) {
  const router = useRouter()
  const [isLogin, setIsLogin] = React.useState<boolean>(false)
  const [openLogin, setOpenLogin] = React.useState<boolean>(false)
  const [user, setUser] = React.useState<UserObj | null>(null)
  const toLogin = (creds: UserCredential) => {
    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(creds),
    }).then(async (res) => {
      const data = await res.json()

      setUser(data)
      setIsLogin(true)
      setOpenLogin(false)

      // this is a bit ugly but this is the quickest way we can solve the "have-to-reload" issue
      // without too much changes in the architecture
      // https://github.com/ralphjayfst/training-job-board-app/pull/10#issuecomment-1805235543
      router.reload();
    })
  }
  const toLogout = (e: React.MouseEvent<HTMLElement>) => {
    fetch('/api/auth/logout', {
      method: 'POST',
    }).then(async (res) => {
      router.reload()
      setUser(null)
      setIsLogin(false)
    }).catch((error) => {
      console.log(error)
    })
    e.preventDefault()
  }

  React.useEffect(() => {
    setIsLogin(!!userObj)
    setUser(userObj || null)
  }, [userObj, auth, router])

  return (
    <>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '30px',
        ml: 'auto',
        mb: 3
      }}>
        {
          isLogin
            ?
              <>
                <Typography component="span">
                  Welcome, {user?.name}
                </Typography>
                <Button
                  variant="contained"
                  onClick={(e) => toLogout(e)}
                >
                  Logout
                </Button>
              </>
            :
              <>
                <Button
                  variant="contained"
                  onClick={() => setOpenLogin(true)}
                >
                  Login
                </Button>
              </>
        }
      </Box>
      <LoginForm
        open={openLogin}
        closePopup={() => setOpenLogin(false)}
        toLogin={toLogin}
      />
    </>
  )
}