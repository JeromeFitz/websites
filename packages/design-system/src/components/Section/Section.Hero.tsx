function SectionHero({ title }) {
  return (
    <div className="w-full pt-10 pr-1 pb-1 pl-0 text-2xl font-black tracking-tight md:text-6xl">
      <p className="pointer-events-none mr-1 -mb-1 ml-0">{title}</p>
    </div>
  )
}

export { SectionHero }
