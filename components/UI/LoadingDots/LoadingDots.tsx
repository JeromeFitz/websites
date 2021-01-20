import styles from './LoadingDots.module.css'

const LoadingDots: React.FC = () => {
  return (
    <span className={styles.root}>
      <span />
      <span />
      <span />
    </span>
  )
}

export default LoadingDots
