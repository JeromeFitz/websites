import _unsupported from '@jeromefitz/notion/api/getTypes/_unsupported'
import checkbox from '@jeromefitz/notion/api/getTypes/checkbox'
import date from '@jeromefitz/notion/api/getTypes/date'
import email from '@jeromefitz/notion/api/getTypes/email'
import files from '@jeromefitz/notion/api/getTypes/files'
// import images from '@jeromefitz/notion/api/getTypes/images'
import multi_select from '@jeromefitz/notion/api/getTypes/multi_select'
import number from '@jeromefitz/notion/api/getTypes/number'
import people from '@jeromefitz/notion/api/getTypes/people'
import phone_number from '@jeromefitz/notion/api/getTypes/phone_number'
import relation from '@jeromefitz/notion/api/getTypes/relation'
import rich_text from '@jeromefitz/notion/api/getTypes/rich_text'
import rollup from '@jeromefitz/notion/api/getTypes/rollup'
import select from '@jeromefitz/notion/api/getTypes/select'
import title from '@jeromefitz/notion/api/getTypes/title'
import url from '@jeromefitz/notion/api/getTypes/url'

const getTypes = {
  checkbox,
  created_by: _unsupported,
  created_time: date,
  date,
  email,
  files,
  formula: _unsupported,
  image: files,
  last_edited_by: _unsupported,
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
