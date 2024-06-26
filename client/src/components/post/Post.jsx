import React from 'react'
import "./post.css"
import { Link } from "react-router-dom"

const Post = ({ post }) => {
    // const PF = "https://eventsandnewsapi.onrender.com/images/"
    return (
        <div className='post'>
            {post.photo && (
                <Link to={`/post/${post._id}`} className='link'><img className='postImg' src={post.photo} alt="" /></Link>
            )}
            <div className="postInfo">
                <div className="postCats">
                    {post.categories.map((c) => (
                        <span className="postCat">{c.name}</span>
                    ))}
                </div>
                <Link to={`/post/${post._id}`} className='link'>
                    <span className="postTitle">
                        {post.title}
                    </span>
                </Link>
                <hr />
                <span className='postDate'>Posted On : {new Date(post.createdAt).toDateString()}</span>
            </div>

            <p className='postDesc'>{post.desc}</p>
        </div>
    )
}

export default Post
