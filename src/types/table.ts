interface FormInterface {
  id: number
  name: string
  email: string
  body: string
}

class InitData {
  id
  name
  email
  body

  constructor () {
    this.id = 0
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