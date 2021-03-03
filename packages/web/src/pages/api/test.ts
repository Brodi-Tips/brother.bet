import { NowRequest, NowResponse} from '@vercel/node'

export default (resquest : NowRequest, response: NowResponse) => {
  return response.json({message: 'arquivo de testes'})
}
