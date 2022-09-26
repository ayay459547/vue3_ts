interface MetaInterface {
  title: string
  isShow: boolean
}

interface AuthorityInterface {
  path: string
  name: string
  meta: MetaInterface
}

type FakeDataType = {
  authority: Array<AuthorityInterface>
  token: string
  userName: string
}

const fakeData = {
  token: 'test',
  userName: 'xie',
  authority: [
    {
      path: 'order',
      name: 'Order',
      meta: {
        title: '訂單',
        isShow: true
      }
    },
    {
      path: 'user',
      name: 'User',
      meta: {
        title: '使用者',
        isShow: true
      }
    },
  ]
}

export {
  MetaInterface,
  AuthorityInterface,
  FakeDataType,
  fakeData
}