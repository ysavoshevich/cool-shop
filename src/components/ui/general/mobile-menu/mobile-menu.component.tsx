import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'gatsby'

import Logo from '~/components/ui/general/logo/logo.component'

import FC from '~/types/fc'

import CloseIcon from '~/assets/icons/menu-close-icon.svg'

import styles from './mobile-menu.module.scss'
import Button from '~/components/ui/general/button/button.component'

interface Props {
  isShown: boolean
  toggle: (value: boolean) => void
}

const MobileMenu: FC<Props> = ({ isShown, toggle }) => {
  const shownClass = [styles.root, styles.root__shown].join(' ')
  const closeClickHandler = () => {
    toggle(false)
  }
  return (
    <div className={isShown ? shownClass : styles.root}>
      <Container style={{ padding: 0 }}>
        <Logo />
        <CloseIcon onClick={closeClickHandler} />
      </Container>
      <Container className={styles.linkBlock}>
        <Link to="/" className={styles.link}>
          Nav Item #1
        </Link>
        <Link to="/" className={styles.link}>
          Nav Item #2
        </Link>
        <Link to="/" className={styles.link}>
          Nav Item #3
        </Link>
        <Button variant={'primary'} additionalClasses={[styles.buttonRoot]}>
          Button
        </Button>
      </Container>
    </div>
  )
}

export default MobileMenu
