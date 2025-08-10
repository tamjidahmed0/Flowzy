'use server'
import { cookies } from 'next/headers'
 
export default async function getCookie({name}) {
  const cookieStore = await cookies()
  const value = cookieStore.get(name)
  return value
}