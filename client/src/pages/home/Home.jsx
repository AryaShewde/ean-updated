import React, { useEffect, useState } from 'react'
import "./home.css"
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import axios from "axios"
import { useLocation } from 'react-router-dom'
import Loading from '../loading/Loading.jsx'

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      // const res = await fetch(`https://eventsandnewsapi.onrender.com/api/posts`, {
      //   method: 'GET',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   }
      // });
      // await res.json();
      const res = await axios.get("https://ean-be-updated.vercel.app/api/posts" + search)
      setPosts(res.data)
      setLoading(false);
    }
    fetchPosts()
  }, [search])

  return (
    <>
      <Header />
      <div className='home'>
        {loading ? (
          <Loading />
        ) : (
          <Posts posts={posts} />
        )}
      </div>
    </>
  )
}

export default Home
