function ListBulleted({ children }) {
  return (
    <ul className="my-2 flex list-inside list-disc flex-col py-2">{children}</ul>
  )
}

export { ListBulleted }
