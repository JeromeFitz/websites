const DATABASES = {
  blog: '27789ca1-49e8-4490-bb29-5a3fdec0ec77',
  episodes: 'f09fac69-3045-46cc-9209-44b13665bada',
  events: '23e3954d-c714-4279-9f81-a8a51c9087ba',
  pages: '96432799-6f4c-46e2-a618-d0d0eb2a79f2',
  people: '6cedcf32-de09-4e81-a658-1aea384821e5',
  podcasts: 'daed70c1-43b2-4177-986b-fe874d346b4e',
  seo: '07dd136e-92cd-49a3-a99d-f409ac3ca87b',
  shows: '552ca1a6-4729-4950-9cd4-cebbec996b91',
  tags: '',
  users: '4579aa0d-1ce2-4175-93d7-5e513f60e82c',
  venues: 'e7bac7a0-e489-4e97-a242-c9934f645621',
}

const PAGES = ['about']

const ROUTE_TYPES = {
  blog: 'blog',
  episodes: 'episodes',
  events: 'events',
  pages: 'pages',
  people: 'people',
  podcasts: 'podcasts',
  seo: 'seo',
  shows: 'shows',
  tags: 'tags',
  users: 'users',
  venues: 'venues',
}

const SEO = {
  blog: 'bf958989-7433-4701-8896-61377571cd1f',
  episodes: 'feb5acb5-2890-41e9-897c-878054228eab',
  events: '73764c77-b623-445f-ac75-63ddaeefea20',
  pages: 'bcfba6bd-5877-4df6-88aa-126d9c73bacb',
  people: 'bf25bb0a-6078-42bc-9cc6-6fbf756ae141',
  podcasts: '5391b1d2-a347-47df-a574-efb7a90f18cf',
  seo: '',
  shows: 'decdf268-7988-4afd-90fc-de165cabe68d',
  tags: '',
  users: 'b9efac47-92ea-4598-9574-16e4161c6ec5',
  venues: 'be79732f-d9f3-4855-866b-6f0f4573410b',
}

const SLUG__HOMEPAGE = 'homepage'

// @todo(notion) uh, make this dynamic please haha
const TAGS = {
  '60dd326d-687e-4e64-a49b-46bfba218ffb': {
    id: '60dd326d-687e-4e64-a49b-46bfba218ffb',
    icon: {
      emoji: '🎭️',
    },
    slug: 'improv',
    title: 'Improv',
  },
  '9ae68a2d-44d0-44c2-8e73-81c3018bbc71': {
    id: '9ae68a2d-44d0-44c2-8e73-81c3018bbc71',
    icon: {
      emoji: '🎼️',
    },
    slug: 'music',
    title: 'Music',
  },
  'd31c1ac1-3f1a-4931-9841-c7fcffaabdf8': {
    id: 'd31c1ac1-3f1a-4931-9841-c7fcffaabdf8',
    icon: {
      emoji: '🧑‍🎤️',
    },
    slug: 'musical',
    title: 'Musical',
  },
  '7093497b-4869-4d2f-8803-a26f4fc871d6': {
    id: '7093497b-4869-4d2f-8803-a26f4fc871d6',
    icon: {
      emoji: '🖊️',
    },
    slug: 'sketch',
    title: 'Sketch',
  },
  '4bf09af2-078e-4101-8519-3500c2d68244': {
    id: '4bf09af2-078e-4101-8519-3500c2d68244',
    icon: {
      emoji: '🎤️',
    },
    slug: 'stand-up',
    title: 'Stand-Up',
  },
}

export { DATABASES, ROUTE_TYPES, PAGES, SEO, SLUG__HOMEPAGE, TAGS }
