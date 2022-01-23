const isActiveLink = (
  link: { href: string; title: string },
  router: { asPath: string }
): boolean => {
  return (
    (router.asPath.length > 1 &&
      router.asPath.startsWith(link.href) &&
      link.title !== 'home') ||
    (router.asPath.length === 1 && link.title === 'home')
  )
}

export default isActiveLink
