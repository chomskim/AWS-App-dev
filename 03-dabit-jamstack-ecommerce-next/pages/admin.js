import { useState, useEffect } from 'react'
import SignUp from '../components/formComponents/SignUp'
import ConfirmSignUp from '../components/formComponents/ConfirmSignUp'
import SignIn from '../components/formComponents/SignIn'
import Inventory from '../components/Inventory'

const Admin = () => {
  const initialState = { formState: 'signUp', isAdmin: false }
  const [state, setState] = useState(initialState)

  useEffect(() => {
    // check and update signed in state
  }, [])

  const toggleFormState = (formState) => {
    setState({ ...state, formState })
  }

  const signUp = async (form) => {
    const { username, email, password } = form
    // sign up
    setState({ ...state, formState: 'confirmSignUp' })
  }
  const confirmSignUp = async (form) => {
    const { username, authcode } = form
    // confirm sign up
    setState({ ...state, formState: 'signIn' })
  }
  const signIn = async (form) => {
    const { username, password } = form
    // signIn
    setState({ formState: 'signedIn', isAdmin: true })
  }
  const signOut = async () => {
    // sign out
    setState({ ...state, formState: 'signUp' })
  }

  const { formState, isAdmin } = state
  const renderForm = (formState, state) => {
    switch (formState) {
      case 'signUp':
        return <SignUp {...state} signUp={signUp} toggleFormState={toggleFormState} />
      case 'confirmSignUp':
        return <ConfirmSignUp {...state} confirmSignUp={confirmSignUp} />
      case 'signIn':
        return <SignIn {...state} signIn={signIn} toggleFormState={toggleFormState} />
      case 'signedIn':
        return isAdmin ? <Inventory {...state} signOut={signOut} /> : <h3>Not an admin</h3>
      default:
        return null
    }
  }

  return (
    <div className='flex flex-col'>
      <div className='max-w-fw flex flex-col'>
        <div className='pt-10'>
          <h1 className='text-5xl font-light'>Admin Panel</h1>
        </div>
        {renderForm(formState)}
      </div>
    </div>
  )
}

export default Admin
