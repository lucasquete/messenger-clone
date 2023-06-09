"use client"
import {SessionProvider } from "next-auth/react"

const Session = SessionProvider

const AuthContext = ({children}) => {

  return (
    <Session>{children}</Session>
  )
}

export default AuthContext