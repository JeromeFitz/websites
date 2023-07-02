function Quote({ children }) {
  return (
    <blockquote className="border-l-radix-pink11 bg-radix-greenA5 m-4 rounded border-l-8 p-6 text-xl md:p-14 md:text-3xl">
      {children}
    </blockquote>
  )
}

export { Quote }
