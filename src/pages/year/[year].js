import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase";
import Link from "next/link";

export async function getServerSideProps(context) {
  const year = context.params.year;

  const q = query(
    collection(db, "quizzes"),
    where("year", "==", year)
  );

  const snapshot = await getDocs(q);

  const quizzes = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  return { props: { quizzes } };
}

export default function Year({ quizzes }) {
  return (
    <div>
      <h2>Quizzes</h2>

      {quizzes.map(q => (
        <Link key={q.id} href={`/quiz/${q.id}`}>
          <div>
            {q.date} - {q.title}
          </div>
        </Link>
      ))}
    </div>
  );
}
