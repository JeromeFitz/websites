/**
 * @note(notion) PageHeader, previous to Notion Content is H1
 * => All Headings from Notion are bumped up by 1 as a result.
 */
function Heading1({ children }) {
  return <h2 className="mb-3 text-3xl font-black md:mb-5 md:text-5xl">{children}</h2>
}

export { Heading1 }
