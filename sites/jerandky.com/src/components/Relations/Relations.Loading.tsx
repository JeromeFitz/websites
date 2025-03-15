function RelationLoading() {
  const random = Math.floor(Math.random() * (10 - 5 + 1)) + 5
  const colWidth = random === 12 ? 'w-full' : `w-${random}/12`
  return (
    <>
      <div className="relative top-0.5 inline-block w-full max-w-sm animate-pulse rounded-md">
        <div
          className={`inline-block h-full rounded bg-[var(--gray-9)] text-base leading-6 font-normal tracking-tight md:text-xl ${colWidth}`}
        >
          &nbsp;
        </div>
      </div>
    </>
  )
}

export { RelationLoading }
