const loader = {
  type: 'table',
  searchQuery: '',
  userTimeZone: 'America/New_York',
  userLocale: 'en',
  loadContentCover: false,
  limit: parseInt(process.env.NEXT_PUBLIC__NOTION_LIMIT),
}

export default loader
