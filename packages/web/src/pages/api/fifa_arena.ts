import { NowRequest, NowResponse } from '@vercel/node'
import ServiceFifaArena from './BotFifaArena/ServiceFifaArena'

export default async (request: NowRequest, response: NowResponse) => {
  try {
    const { date } = request.query
    const result = await ServiceFifaArena.updateFifaArena(date)

    response.status(200).json({ message: `${date || 'Dia anterior'} atualizado com sucesso` })
  } catch (error) {
    console.log(error)
    response.status(500).json({
      message: 'Estamos com indisponibilidade no momento, tente novamente mais tarde!',
      ...error,
    })
  }
}
