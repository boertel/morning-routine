import { Link } from "ui";
import { useEffect, useState } from "react";

const SENTENCES = [
  "so he can function in the morning.",
  "so he can stretch after seating at his desk for too long.",
  "so he can have five peaceful minutes before getting annoyed at technology.",
];
const r = () => Math.floor(Math.random() * Math.floor(SENTENCES.length));

export default function Footer() {
  const [sentence, setSentence] = useState(null);

  useEffect(() => {
    setSentence(SENTENCES[r()]);
  }, [SENTENCES, r]);

  return (
    <footer className="mb-1 mt-10 py-2 border-gray-600 border-t text-xs text-gray-400 sticky bottom-0 bg-black print:absolute">
      Built by <Link href="https://ben.oertel.fr">Benjamin Oertel</Link> {sentence}
    </footer>
  );
}
