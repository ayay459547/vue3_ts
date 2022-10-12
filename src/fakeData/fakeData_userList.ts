interface accessInterface {
  path: string
  name: string
  title: string
  isShow: boolean
}

interface FakeDataInterface {
  id: number
  userId: number
  name: string
  access: Array<accessInterface>
}

const fakeData: Array<FakeDataInterface> = [
  {
    id: 1,
    userId: 11,
    name: 'Admin',
    access: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        title: '儀錶板',
        isShow: true
      },
      {
        path: 'table',
        name: 'Table',
        title: '表單',
        isShow: true
      },
      {
        path: 'user',
        name: 'User',
        title: '使用者',
        isShow: true
      }
    ]
  },
  {
    id: 2,
    userId: 12,
    name: 'Tina',
    access: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        title: '儀錶板',
        isShow: true
      },
      {
        path: 'table',
        name: 'Table',
        title: '表單',
        isShow: true
      },
      {
        path: 'user',
        name: 'User',
        title: '使用者',
        isShow: true
      }
    ]
  },
  {
    id: 3,
    userId: 13,
    name: 'Ace',
    access: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        title: '儀錶板',
        isShow: true
      },
      {
        path: 'table',
        name: 'Table',
        title: '表單',
        isShow: false
      },
      {
        path: 'user',
        name: 'User',
        title: '使用者',
        isShow: false
      }
    ]
  }
]

export {
  FakeDataInterface,
  fakeData
}