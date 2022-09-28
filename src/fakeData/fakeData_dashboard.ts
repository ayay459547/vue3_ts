interface FakeDataInterface {
  language: string
  percent: number
}

const fakeData: Array<FakeDataInterface> = [
  {
    language: 'JavaScript',
    percent: 64.96
  },
  {
    language: 'HTML/CSS',
    percent: 56.07
  },
  {
    language: 'Python',
    percent: 48.24
  },
  {
    language: 'SQL',
    percent: 47.08
  },
  {
    language: 'Java',
    percent: 35.35
  },
  {
    language: 'Node.js',
    percent: 33.91
  },
  {
    language: 'TypeScript',
    percent: 30.19
  },
  {
    language: 'C#',
    percent: 27.86
  },
  {
    language: 'Bash/Shell',
    percent: 27.13
  },
  {
    language: 'C++',
    percent: 24.31
  },
  {
    language: 'PHP',
    percent: 21.98
  }
]

export {
  FakeDataInterface,
  fakeData
}