import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'

import api from '../../../services/api'

const Comment = ({ data, type, date }) => {
  const { isFallback } = useRouter()

  if (isFallback) {
    return <p>Carregando...</p>
  }

  return data?.map((item) => (
    <>
      <h1>Unique Id: {item.id}</h1>
      <h1>You want the type: {type}</h1>
      <h1>You neet the dates: </h1>
      <ul>
        <li>from:{date}</li>
      </ul>
    </>
  ))
}

export const getStaticPaths: GetStaticPaths = async () => {
  const data = ['01-08-2020']

  const paths = data.map((item) => {
    return {
      params: {
        data: data,
        type: 'users',
        date: item,
      },
    }
  })

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { type, date } = context.params

  const { data } = await api.get(`/fifaArena/since?date=${date}`)

  return {
    props: {
      data: data,
      type,
      date,
    },
    revalidate: 3600,
  }
}

export default Comment
