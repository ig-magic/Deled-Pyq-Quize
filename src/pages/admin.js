import { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Admin() {
  const [json, setJson] = useState("");

  async function addQuiz() {
    try {
      const data = JSON.parse(json);

      await addDoc(collection(db, "quizzes"), data);

      alert("✅ Quiz Added Successfully!");
      setJson("");
    } catch (err) {
      alert("❌ Invalid JSON");
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Panel</h2>

      <textarea
        rows="15"
        cols="60"
        placeholder="Paste quiz JSON here..."
        value={json}
        onChange={(e) => setJson(e.target.value)}
      />

      <br /><br />

      <button onClick={addQuiz}>
        Add Quiz
      </button>
    </div>
  );
}
