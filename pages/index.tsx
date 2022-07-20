import type { NextPage } from 'next'
import Landing from '../components/landing/Landing'
import styles from '../styles/Home.module.scss'
import useUser from '../data/fetchers/auth/useUser';

const Home: NextPage = () => {
  const { mutateUser } = useUser({
    redirectTo: '/dash',
    redirectIfFound: true
  })

  return (
    <div className={styles.container}>
      <Landing mutateUser={mutateUser} />
    </div>
  )
}

export default Home
