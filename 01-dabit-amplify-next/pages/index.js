import { useState, useEffect } from 'react'
import Link from 'next/link'
import { API } from 'aws-amplify'
import { listPosts } from '../graphql/queries'

export default function Home() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetchPosts()
  }, [])
  async function fetchPosts() {
    const postData = await API.graphql({
      query: listPosts,
    })
    setPosts(postData.data.listPosts.items)
  }
  return (
    <div>
      <h1 className='text-3xl font-semibold tracking-wide mt-6 mb-2 ml-6'>
        Posts
      </h1>
      {posts.map((post, index) => (
        <Link key={index} href={`/posts/${post.id}`}>
          <div className='cursor-pointer border-b border-gray-300	mt-8 ml-4 pb-4'>
            <h2 className='text-xl font-semibold'>{post.title}</h2>
          </div>
        </Link>
      ))}
    </div>
  )
}
