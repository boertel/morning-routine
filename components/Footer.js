import { Link } from "ui";
const sentences = [
  "so he can function in the morning.",
  "so he can stretch after seating at his desk for too long.",
  "so he can have five peaceful minutes before getting annoyed at technology.",
];
const r = Math.floor(Math.random() * Math.floor(sentences.length));

export default function Footer() {
  return (
    <footer className="mb-1 mt-10 py-2 border-gray-600 border-t text-xs text-gray-400 sticky bottom-0 bg-black">
      Built by <Link href="https://ben.oertel.fr">Benjamin Oertel</Link> {sentences[r]}
    </footer>
  );
}
