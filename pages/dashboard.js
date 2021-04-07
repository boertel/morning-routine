import useAuth from "auth/useAuth";

export default function Dashboard() {
  const { user, loading } = useAuth();

  return (
    <>
      <h1>Dashboard</h1>
      {loading ? "Loading..." : user.email}
    </>
  );
}
