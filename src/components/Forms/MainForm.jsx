import { useState } from 'react'
import { RegistrationForm } from './Registration'
import { LoginForm } from './Login'

export const MainForm = ({ handleRegistration, handleLogin }) => {
  const [formType, setFormType] = useState('login')

  if (formType === 'login') {
    return <LoginForm onChangeType={setFormType} onSubmit={handleLogin} />
  }

  if (formType === 'registration') {
    return <RegistrationForm onChangeType={setFormType} onSubmit={handleRegistration} />
  }
}
