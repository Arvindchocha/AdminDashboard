import {supabase} from '../lib/supabase'
import type {User,Session} from '@supabase/supabase-js'

export interface AuthResponse {
    user : User | null;
    session: Session | null
}

/**
 * Register new user
 */

export const registerUser = async (email:string,password:string) : Promise<AuthResponse> => {
    const {data,error} = await supabase.auth.sighnUp({email,password})
    if(error){
        throw new Error(error.message)
    }
    return{
        user: data.user,
        session: data.session
    }
}

/**
 * Login existing user
 */

export const loginUser = async (email:string,password:string) : Promise<AuthResponse> => {
const {data,error} = await supabase.auth.sighnUp({email,password})
    if(error){
        throw new Error(error.message)
    }
    return{
        user: data.user,
        session: data.session
    }
}


/**
 * Logout current user
 */
export const logoutUser = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw new Error(error.message)
  }
}



/**
 * Get current session
 */
export const getCurrentSession = async (): Promise<Session | null> => {
  const { data, error } = await supabase.auth.getSession()

  if (error) {
    throw new Error(error.message)
  }

  return data.session
}



/**
 * Listen to auth state changes
 */
export const onAuthStateChange = (
  callback: (session: Session | null) => void
) => {
  return supabase.auth.onAuthStateChange((_event, session) => {
    callback(session)
  })
}