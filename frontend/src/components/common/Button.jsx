import { Link } from 'react-router-dom'

const variantMap = {
  primary: 'btn-mugumo-primary',
  outline: 'btn-mugumo-outline',
  'outline-navy': 'btn-mugumo-outline-navy',
}

export default function Button({ to, href, variant = 'primary', children, className = '', ...rest }) {
  const cls = `${variantMap[variant] ?? variantMap.primary} ${className}`.trim()

  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <Link to={to ?? '/'} className={cls} {...rest}>
      {children}
    </Link>
  )
}
