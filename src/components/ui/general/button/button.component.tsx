import React, { ReactNode } from 'react'
import { Button } from 'react-bootstrap'
import classnames from 'classnames'

import FC from '~/types/fc'

import styles from './button.module.scss'

interface Props {
  variant: 'primary' | 'secondary'
  type?: 'button' | 'submit' | 'reset'
  children: ReactNode
  additionalClasses?: string[]
  onClick?: (e: React.MouseEvent) => void
}

const SButton: FC<Props> = ({
  variant,
  type = 'button',
  children,
  additionalClasses,
  className,
  onClick,
}) => {
  let variantStyles
  switch (variant) {
    case 'primary':
      variantStyles = styles.primary
      break
    case 'secondary':
      variantStyles = styles.secondary
      break
    default:
      break
  }
  return (
    <Button
      type={type}
      onClick={onClick}
      className={classnames(
        styles.button,
        variantStyles,
        additionalClasses,
        className
      )}
    >
      {children}
    </Button>
  )
}

export default SButton
