import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react'

type ButtonBaseProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary'
  fullWidth?: boolean
  className?: string
}

type ButtonLinkProps = ButtonBaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
  }

type ButtonElementProps = ButtonBaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined
  }

type ButtonProps = ButtonLinkProps | ButtonElementProps

function Button({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const classes = [
    'button',
    `button-${variant}`,
    fullWidth ? 'button-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if ('href' in props && props.href) {
    return (
      <a {...props} className={classes}>
        {children}
      </a>
    )
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>

  return (
    <button type={buttonProps.type ?? 'button'} {...buttonProps} className={classes}>
      {children}
    </button>
  )
}

export default Button
