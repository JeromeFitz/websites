function SectionHero({ title }) {
  return (
    <div className="w-full pb-1 pl-0 pr-1 pt-10 text-2xl font-black tracking-tight md:text-6xl">
      <p className="pointer-events-none -mb-1 ml-0 mr-1">{title}</p>
    </div>
  )
}

export { SectionHero }
