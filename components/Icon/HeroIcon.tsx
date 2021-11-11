import dynamic from 'next/dynamic'

const HeroIcon = ({ className = 'h-5 w-5', icon }) => {
  const Icon = dynamic(
    () => import('@heroicons/react/solid').then((mod) => mod[icon]),
    {
      loading: () => null,
      ssr: false,
    }
  )

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Icon className={className} style={{ height: '1.25rem', width: '1.25rem' }} />
  )
}

export default HeroIcon
