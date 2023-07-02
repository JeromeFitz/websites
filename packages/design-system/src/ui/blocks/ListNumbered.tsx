function ListNumbered({ children }) {
  return (
    <ol className="my-2 flex list-inside list-decimal flex-col py-2">{children}</ol>
  )
}

export { ListNumbered }
