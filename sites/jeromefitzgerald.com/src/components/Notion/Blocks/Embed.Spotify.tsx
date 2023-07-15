function EmbedSpotify({ id }) {
  return (
    <div className="relative h-full max-h-[480] w-full overflow-hidden [&>*:iframe]:absolute [&>*:iframe]:left-0 [&>*:iframe]:top-0 [&>*:iframe]:h-full [&>*:iframe]:max-h-[600] [&>*:iframe]:w-full">
      <iframe
        // style="border-radius:12px"
        src={`https://open.spotify.com/embed/episode/${id}`}
        // width="720"
        height="152" // compact
        // height="352" // normal
        // height="100%"
        width="100%"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        sandbox="allow-scripts allow-presentation allow-popups allow-top-navigation-by-user-activation allow-forms allow-same-origin"
        loading="lazy"
      />
    </div>
  )
}

export { EmbedSpotify }
