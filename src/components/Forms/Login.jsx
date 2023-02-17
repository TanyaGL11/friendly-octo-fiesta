import { Formik, Field, Form } from 'formik'
import cn from 'classnames'
import style from './style.module.css'
import { validateEmail, validateField } from '../../utils/generalFunc'

export const LoginForm = ({ onChangeType, onSubmit }) => {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form className={style.form}>
          <Field name="email" placeholder="Email" className={style.input} validate={validateEmail} />
          {errors.email && touched.email && <div>{errors.email}</div>}
          <Field type="password" name="password" placeholder="Password" className={style.input} validate={validateField} />
          {errors.password && touched.password && <div>{errors.password}</div>}
          <button type="submit" className={cn(style.button, style.mainButton)}>
            Войти
          </button>
          <button onClick={() => onChangeType('registration')} className={style.button}>
            Регистрация
          </button>
        </Form>
      )}
    </Formik>
  )
}