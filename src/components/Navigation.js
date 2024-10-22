import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

const Navigation = () => {
  const { isAuthenticated, login, logout, register } = useAuth();

  return (
    <nav>
      <Link href="/">Home</Link>
      {isAuthenticated ? (
        <>
          <Link href="/profile">Profile</Link>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <>
          <button onClick={login}>Login</button>
          <button onClick={register}>Register</button>
        </>
      )}
    </nav>
  );
};

export default Navigation;
