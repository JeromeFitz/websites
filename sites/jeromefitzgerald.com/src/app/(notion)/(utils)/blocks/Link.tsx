import { Anchor } from '@jeromefitz/ds/components/Anchor'

const Link = ({ className, href, plain_text }) => {
  return (
    <Anchor className={className} href={href}>
      {plain_text}
    </Anchor>
  )
}

export { Link }
export default Link
