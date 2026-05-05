import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [dbTime, setDbTime] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // Test backend API
    fetch(`${API_URL}/api/hello`)
      .then(res => res.json())
      .then(data => setMessage(data.message));

    // Test DB API
    fetch(`${API_URL}/api/db-test`)
      .then(res => res.json())
      .then(data => setDbTime(data[0].now));
  }, []);

  return (
    <div>
      <h1>Full Stack Test</h1>

      <h3>Backend:</h3>
      <p>{message}</p>

      <h3>Database Time:</h3>
      <p>{dbTime}</p>
    </div>
  );
}

export default App;

