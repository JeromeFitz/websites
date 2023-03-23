function formatDateForSlug(date) {
  return date.slice(0, 10).replaceAll('-', '/')
}

export { formatDateForSlug }
