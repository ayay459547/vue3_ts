interface FormInterface {
  name: string
  email: string
  body: string
}

class InitData {
  name
  email
  body

  constructor () {
    this.name = ''
    this.email = ''
    this.body =  ''
  }
}

type TipType = (text: string) => string

export {
  FormInterface,
  InitData,
  TipType
}