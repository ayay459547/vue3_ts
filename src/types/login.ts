interface FormInterface {
  account: string
  password: string
}

class InitData {
  account
  password

  constructor () {
    this.account = ''
    this.password =  ''
  }
}

type TipType = (text: string) => string

export {
  FormInterface,
  InitData,
  TipType
}