import type { InputHTMLAttributes } from 'react'

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

function TextField({
  label,
  id,
  name,
  error,
  className = '',
  ...inputProps
}: TextFieldProps) {
  const inputId = id ?? name
  const errorId = error && inputId ? `${inputId}-error` : undefined
  const classes = ['text-field', className].filter(Boolean).join(' ')

  return (
    <label className={classes} htmlFor={inputId}>
      <span className="text-field-label">{label}</span>
      <input
        id={inputId}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        {...inputProps}
      />
      {error ? (
        <span className="text-field-error" id={errorId}>
          {error}
        </span>
      ) : null}
    </label>
  )
}

export default TextField
