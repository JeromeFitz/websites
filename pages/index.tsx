import Container from '~components/Container'
import Header from '~components/Header'

const title = 'Home'
const description = 'Placeholder until Notion normalizer and routing is in place.'
const header = {
  description,
  title,
}

const Index = () => {
  return (
    <Container>
      <Header {...header} />
    </Container>
  )
}

export default Index
