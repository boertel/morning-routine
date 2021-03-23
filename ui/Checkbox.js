import cn from 'classnames'

export default function Checkbox({ children, className, ...props }) {
  return (
    <label className={cn('', className)}>
      <input type="checkbox" {...props} />
      {children}
    </label>
  )
}
