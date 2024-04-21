function EmbedSpotify({ id }) {
  return (
    <div className="relative size-full max-h-[480] overflow-hidden [&>*:iframe]:absolute [&>*:iframe]:left-0 [&>*:iframe]:top-0 [&>*:iframe]:size-full [&>*:iframe]:max-h-[600]">
      <iframe
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
        // height="352" // normal
        frameBorder="0"
        // width="720"
        height="152" // compact
        loading="lazy"
        sandbox="allow-scripts allow-presentation allow-popups allow-top-navigation-by-user-activation allow-forms allow-same-origin"
        // style="border-radius:12px"
        src={`https://open.spotify.com/embed/episode/${id}`}
        // height="100%"
        title="iframe-embedded-spotify"
        width="100%"
      />
    </div>
  )
}

export { EmbedSpotify }
