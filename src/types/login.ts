interface FormInterface {
  account: string
  password: string
}

class InitData {
  account
  password

  constructor () {
    this.account = 'admin'
    this.password =  'admin'
  }
}

type TipType = (text: string) => string

export {
  FormInterface,
  InitData,
  TipType
}