import { useState } from "react"

const Registration = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleRegister = async () => {
    const res=await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    })

    const data = await res.json()

  if (res.ok) {
    alert("Registered successfully ")
  } else {
    alert(data.message)  
  }
}

  return (
    <div>
      <h2>Register</h2>
      <input onChange={(e)=>setUsername(e.target.value)} placeholder="username" />
      <input type="password" onChange={(e)=>setPassword(e.target.value)} placeholder="password" />
      <button onClick={handleRegister}>Register</button>
    </div>
  )
}

export default Registration