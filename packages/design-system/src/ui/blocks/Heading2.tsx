/**
 * @note(notion) PageHeader, previous to Notion Content is H1
 * => All Headings from Notion are bumped up by 1 as a result.
 */
function Heading2({ children }) {
  return <h3 className="my-4 text-xl font-black md:mt-0 md:text-4xl">{children}</h3>
}

export { Heading2 }
