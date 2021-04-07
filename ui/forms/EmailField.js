import {Field} from 'formik';
import Input from '../Input'

export default function EmailField(props) {
  return (
    <Field type="email" as={Input} {...props} />
  )
}
