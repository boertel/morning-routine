import { useState, useEffect } from "react";
import { Menu } from "@headlessui/react";
import { Link } from "ui";
const sentences = [
  "so he can function in the morning.",
  "so he can stretch after seating at his desk for too long.",
  "so he can have five peaceful minutes before getting annoyed at technology.",
];

export default function Footer() {
  const [index, setIndex] = useState(null);
  useEffect(() => {
    setIndex(Math.floor(Math.random() * Math.floor(sentences.length)));
  }, []);

  return (
    <footer className="flex justify-between mb-1 mt-10 mx-3 border-gray-600 border-t text-xs text-gray-400 sticky bottom-0 bg-black print:absolute">
      <div className="py-2">
        Built by <Link href="https://ben.oertel.fr">Benjamin Oertel</Link> {index !== null && sentences[index]}
      </div>
      <div>
        <Menu as="div" className="relative">
          <Menu.Button className="p-2">
            <UserIcon className="text-primary-600 hover:text-primary w-4 w-4 cursor-pointer" />
          </Menu.Button>
          <Menu.Items className="absolute bottom-full w-40 flex flex-col space-y-1 p-3 bg-black border border-primary rounded-md mb-2 right-0">
            <Menu.Item>
              {({ active }) => (
                <Link href="/">
                  <a>Go to my profile</a>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link href="/auth/logout">
                  <a>Logout</a>
                </Link>
              )}
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
    </footer>
  );
}

function UserIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </svg>
  );
}
