import Seo from '~components/Seo'
import Layout from '~components/Layout'
import Header from '~components/Header'

const Events = () => {
  const url = 'https://jeromefitzgerald.com/events'
  const title = 'Events'
  const description =
    'Upcoming Events that feature comedian Jerome Fitzgerald. Though primarily based in Pittsburgh, occasionally he will venture out into the wide world and do shows elsewhere.'
  const header = {
    description,
    title,
  }

  const seo = {
    title: title,
    description: description,
    canonical: url,
    openGraph: {
      url,
      title,
      description,
    },
  }

  return (
    <Layout>
      <Seo {...seo} />
      <Header {...header} />
      <div id="content">
        <div className="mb-4">
          <p className="my-4">
            January of 2020, I was performing in SF Sketchfest. In February, did my
            last festival. The first week of March, I stopped performing anywhere
            in-person and it was an incredibly easy decision.
          </p>
          <p className="my-4">
            At the start I was doing weekly shows online to raise money for charity
            and brought in friends from outside of Pittsburgh like: Ahri Findling
            (NYC), Casually Dope (BMORE), Chanel Ali (NYC), Cigarette Sandwich (CHI)
            , Eric Dadourain (BMORE), Helen Wildy (SEA), Pallavi Gunalan (LA), and
            more.
          </p>
          <p className="my-4">
            <strong>We raised a few thousand. Not too shabby.</strong>
          </p>
          <p className="my-4">
            Taken a step back to re-focus offline. If any shows I am going to feature
            in come up, they will be here I guess. Though I imagine anyone who did
            check my website for upcoming events stopped a long time ago. (Thank you
            for reading this far.)
          </p>
        </div>
      </div>
    </Layout>
  )
}

export default Events
