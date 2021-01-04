import SplitText from '~components/SplitText'

const Header = ({ description, title }) => (
  <>
    <h1 aria-label={title}>
      <span aria-hidden="true" className="md:hidden">
        {title}
      </span>
      <span aria-hidden="true" className="hidden md:flex flex-row flex-wrap">
        <SplitText splitBy="letter" text={title} />
      </span>
    </h1>
    <div className="mt-2 mb-4 font-medium text-2xl leading-tight md:max-w-3xl">
      <p className="lead">{description}</p>
    </div>
  </>
)

export default Header
