const isActiveLink = (link, router): boolean => {
  return (
    (router.asPath.length > 1 &&
      router.asPath.startsWith(link.href) &&
      link.title !== 'home') ||
    (router.asPath.length === 1 && link.title === 'home')
  )
}

export default isActiveLink
