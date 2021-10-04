import dynamic from 'next/dynamic'

const HeroIcon = ({ className = 'h-5 w-5', icon }) => {
  const Icon = dynamic(
    () => import('@heroicons/react/solid').then((mod) => mod[icon]),
    {
      loading: () => null,
      ssr: false,
    }
  )

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return <Icon className={className} />
}

export default HeroIcon
