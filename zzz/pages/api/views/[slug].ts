import db from '~lib/firebase'

const viewsSlugApi = async (req, res) => {
  if (req.method === 'POST') {
    const ref = db.ref('views').child(req.query.slug)
    const { snapshot } = await ref.transaction((currentViews: number) => {
      if (currentViews === null) {
        return 1
      }
      return currentViews + 1
    })

    return res.status(200).json({
      total: snapshot.val(),
    })
  }

  if (req.method === 'GET') {
    const snapshot = await db.ref('views').child(req.query.slug).once('value')
    const views = snapshot.val()

    return res.status(200).json({ total: views })
  }
}

export default viewsSlugApi
