function Callout({ children }) {
  return (
    <blockquote className="border-l-radix-green11 bg-radix-pinkA5 m-4 rounded border-l-8 p-14 text-xl md:text-3xl">
      {children}
    </blockquote>
  )
}

export { Callout }
