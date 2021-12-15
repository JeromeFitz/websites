interface NotionAnnotations {
  bold: boolean
  code: boolean
  color: string
  italic: boolean
  strikethrough: boolean
  underline: boolean
}

interface NotionTextContent {
  content: string
  link: string | null
}

interface NotionText {
  annotations: NotionAnnotations
  href: string | null
  plain_text: string
  text: NotionTextContent
  type: string
}

interface NotionUrl {
  url: string
}

interface NotionImage {
  file?: NotionUrl
  caption?: NotionText
  external?: NotionUrl
  type: string
}

interface NotionBlock {
  created_time: string
  has_children: string
  id: string
  last_edited_time: string
  object: string
  type: string
  //
  heading_1?: NotionText[]
  heading_2?: NotionText[]
  heading_3?: NotionText[]
  heading_4?: NotionText[]
  heading_5?: NotionText[]
  heading_6?: NotionText[]
  image?: NotionImage
  paragraph?: NotionText[]
}

export type { NotionBlock, NotionText }
