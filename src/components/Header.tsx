import * as React from 'react'
import { Typography, Button, Box } from '@mui/material'
import { useRouter } from 'next/router'
import { auth } from '@/firebase'
import LoginForm from './LoginForm'
import UserObj from '@/interfaces/User'

type Props = {
  userObj: UserObj | null
}

export default function Header({ userObj }: Props) {
  const router = useRouter()
  const [isLogin, setIsLogin] = React.useState<boolean>(false)
  const [openLogin, setOpenLogin] = React.useState<boolean>(false)
  const [user, setUser] = React.useState<UserObj | null>(null)
  let toLogout = (e: React.MouseEvent<HTMLElement>) => {console.log('logout')}
  const toLogin = (creds: Object) => {
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
    })
  }

  React.useEffect(() => {
    setIsLogin(!!userObj)
    setUser(userObj || null)


    toLogout = (e: React.MouseEvent<HTMLElement>) => {
      console.log('logout', userObj?.user)
      auth.signOut()
      // router.reload()
      e.preventDefault()
    }
  }, [userObj, toLogout, auth, router])

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