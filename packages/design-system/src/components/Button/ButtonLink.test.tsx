import { expect } from '@jest/globals'
import { composeStories } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import * as stories from './ButtonLink.stories'

const ButtonLinkStories = composeStories(stories)

const values = {
  href: 'https://jeromefitzgerald.com',
  link: { name: 'GOODIE MOB arsenal 0123456789' },
}

describe('Link', () => {
  it('renders a link', () => {
    render(<ButtonLinkStories.Default />)

    const link = screen.getByRole('link', { name: values.link.name })

    expect(link).toHaveAttribute('href', values.href)
  })
})
