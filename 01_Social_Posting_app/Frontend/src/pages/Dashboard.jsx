import { useEffect, useState } from "react"

const Dashboard = () => {
  const [posts, setPosts] = useState([])
  const [content, setContent] = useState("")

  const token = localStorage.getItem("token")

  // fetch posts
  const getPosts = async () => {
    const res = await fetch("http://localhost:3000/api/posts")
    const data = await res.json()
    setPosts(data)
  }

  useEffect(() => {
    getPosts()
  }, [])

  // create post
  const createPost = async () => {
    await fetch("http://localhost:3000/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({ content })
    })

    setContent("")
    getPosts()
  }

  // like
  const likePost = async (id) => {
    await fetch(`http://localhost:3000/api/posts/${id}/like`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + token
      }
    })

    getPosts()
  }

  return (
    <div>
      <h2>Dashboard</h2>

      <input
        placeholder="write post..."
        value={content}
        onChange={(e)=>setContent(e.target.value)}
      />
      <button onClick={createPost}>Post</button>

      <hr />

      {posts.map((post) => (
        <div key={post._id}>
          <h4>{post.username}</h4>
          <p>{post.content}</p>
          <p>❤️ {post.likes}</p>
          <button onClick={()=>likePost(post._id)}>Like</button>
        </div>
      ))}
    </div>
  )
}

export default Dashboard