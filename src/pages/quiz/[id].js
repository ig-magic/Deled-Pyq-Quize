import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useState } from "react";

export async function getServerSideProps(context) {
  const ref = doc(db, "quizzes", context.params.id);
  const snap = await getDoc(ref);

  return {
    props: { quiz: snap.data() }
  };
}

export default function Quiz({ quiz }) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  const q = quiz.questions[index];

  function selectOption(i) {
    if (answered) return;
    setAnswered(true);

    if (i === q.answer) setScore(score + 1);
  }

  return (
    <div>
      <h3>{q.question}</h3>

      {q.options.map((opt, i) => (
        <button key={i} onClick={() => selectOption(i)}>
          {opt}
        </button>
      ))}

      <br />

      <button onClick={() => {
        setIndex(index + 1);
        setAnswered(false);
      }}>
        Next
      </button>
    </div>
  );
}
