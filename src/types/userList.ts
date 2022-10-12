interface FormInterface {
  name: string
  access: string
}

class InitData {
  name
  access

  constructor () {
    this.name = ''
    this.access = ''
  }
}

type TipType = (text: string) => string

export {
  FormInterface,
  InitData,
  TipType
}