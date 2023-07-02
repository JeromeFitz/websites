function RelationLoading() {
  const random = Math.floor(Math.random() * (10 - 5 + 1)) + 5
  const colWidth = random === 12 ? 'w-full' : `w-${random}/12`
  return (
    <>
      <div className="relative top-[0.125rem] inline-block w-full max-w-sm animate-pulse rounded-md">
        <div
          className={`bg-radix-slate9 inline-block h-full rounded text-base font-normal leading-6 tracking-tight md:text-xl ${colWidth}`}
        >
          &nbsp;
        </div>
      </div>
    </>
  )
}

export { RelationLoading }
