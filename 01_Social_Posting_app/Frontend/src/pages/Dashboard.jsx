import { useEffect, useState } from "react"

const Dashboard = () => {
  const [posts, setPosts] = useState([])
  const [content, setContent] = useState("")
  const [editId, setEditId] = useState(null)
  const [editContent, setEditContent] = useState("")

  const token = localStorage.getItem("token")
  const user = JSON.parse(atob(token.split(".")[1])).username

  const getPosts = async () => {
    const res = await fetch("http://localhost:3000/api/posts")
    const data = await res.json()
    setPosts(data)
  }

  useEffect(() => {
    getPosts()
  }, [])

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

  const likePost = async (id) => {
    await fetch(`http://localhost:3000/api/posts/${id}/like`, {
      method: "PUT",
      headers: { Authorization: "Bearer " + token }
    })
    getPosts()
  }

  const deletePost = async (id) => {
    await fetch(`http://localhost:3000/api/posts/${id}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token }
    })
    getPosts()
  }

  const updatePost = async (id) => {
    await fetch(`http://localhost:3000/api/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify({ content: editContent })
    })
    setEditId(null)
    getPosts()
  }

  return (
  <div className="min-h-screen bg-gray-100 flex justify-center py-6 ">
  <div className="w-full max-w-xl">

    {/* Header */}
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-gray-800">🚀 Social Feed</h1>
      <button
        onClick={() => {
          localStorage.removeItem("token")
          window.location.href = "/"
        }}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
      >
        Logout
      </button>
    </div>

    {/* Create Post */}
    <div className="bg-white p-4 rounded-xl shadow mb-6">
      <input
        className="w-full border p-3 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="What's on your mind?"
        value={content}
        onChange={(e)=>setContent(e.target.value)}
      />
      <button
        onClick={createPost}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
      >
        Post
      </button>
    </div>

    {/* Posts */}
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post._id} className="bg-white p-4 rounded-xl shadow">

          <h3 className="font-semibold text-blue-600">
            @{post.username}
            {post.username === user && (
              <span className="text-green-500 ml-2">(You)</span>
            )}
          </h3>

          <p className="mt-2 text-gray-700">{post.content}</p>

          <div className="flex justify-between items-center mt-4">

            <span className="text-red-500">❤️ {post.likes}</span>

            <div className="flex gap-2">

              <button
                onClick={()=>likePost(post._id)}
                className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200"
              >
                Like
              </button>

              {post.username === user && (
                <>
                  <button
                    onClick={()=>{
                      setEditId(post._id)
                      setEditContent(post.content)
                    }}
                    className="bg-yellow-100 px-3 py-1 rounded hover:bg-yellow-200"
                  >
                    Edit
                  </button>

                  <button
                    onClick={()=>deletePost(post._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </>
              )}

            </div>
          </div>

        </div>
      ))}
    </div>

  </div>
</div>
)
}

export default Dashboard






// import { useEffect, useState } from "react"

// const Dashboard = () => {
//   const [posts, setPosts] = useState([])
//   const [content, setContent] = useState("")

//   const token = localStorage.getItem("token")

//   // fetch posts
//   const getPosts = async () => {
//     const res = await fetch("http://localhost:3000/api/posts")
//     const data = await res.json()
//     setPosts(data)
//   }

//   useEffect(() => {
//     getPosts()
//   }, [])

//   // create post
//   const createPost = async () => {
//     await fetch("http://localhost:3000/api/posts", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: "Bearer " + token
//       },
//       body: JSON.stringify({ content })
//     })

//     setContent("")
//     getPosts()
//   }

//   // like
//   const likePost = async (id) => {
//     await fetch(`http://localhost:3000/api/posts/${id}/like`, {
//       method: "PUT",
//       headers: {
//         Authorization: "Bearer " + token
//       }
//     })

//     getPosts()
//   }

//   return (
//     <div>
//       <h2>Dashboard</h2>

//       <input
//         placeholder="write post..."
//         value={content}
//         onChange={(e)=>setContent(e.target.value)}
//       />
//       <button onClick={createPost}>Post</button>

//       <hr />

//       {posts.map((post) => (
//         <div key={post._id}>
//           <h4>{post.username}</h4>
//           <p>{post.content}</p>
//           <p>❤️ {post.likes}</p>
//           <button onClick={()=>likePost(post._id)}>Like</button>
//         </div>
//       ))}
//     </div>
//   )
// }

// export default Dashboard