/**
 * @note(notion) PageHeader, previous to Notion Content is H1
 * => All Headings from Notion are bumped up by 1 as a result.
 */
function Heading3({ children }) {
  return <h4 className="mb-3 text-lg font-black md:text-2xl">{children}</h4>
}

export { Heading3 }
