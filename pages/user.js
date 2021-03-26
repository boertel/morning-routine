import prisma from "lib/prisma";

export async function getServerSideProps(context) {
  const user = await prisma.user.findUnique({
    where: {
      email: "benjamin.oertel@gmail.com",
    },
  });
  return {
    props: {
      user,
    },
  };
}

export default function User({ user }) {
  return <div>{user.name}</div>;
}
