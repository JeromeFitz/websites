import _todo from '~lib/notion/api/getTypes/_todo'
import checkbox from '~lib/notion/api/getTypes/checkbox'
import date from '~lib/notion/api/getTypes/date'
import email from '~lib/notion/api/getTypes/email'
import files from '~lib/notion/api/getTypes/files'
import multi_select from '~lib/notion/api/getTypes/multi_select'
import number from '~lib/notion/api/getTypes/number'
import people from '~lib/notion/api/getTypes/people'
import phone_number from '~lib/notion/api/getTypes/phone_number'
import relation from '~lib/notion/api/getTypes/relation'
import rich_text from '~lib/notion/api/getTypes/rich_text'
import rollup from '~lib/notion/api/getTypes/rollup'
import select from '~lib/notion/api/getTypes/select'
import title from '~lib/notion/api/getTypes/title'
import url from '~lib/notion/api/getTypes/url'

const getTypes = {
  checkbox,
  created_by: _todo,
  created_time: date,
  date,
  email,
  files,
  formula: _todo,
  last_edited_by: _todo,
  last_edited_time: date,
  multi_select,
  number,
  people,
  phone_number,
  relation,
  rich_text,
  rollup,
  select,
  title,
  url,
}

export default getTypes
