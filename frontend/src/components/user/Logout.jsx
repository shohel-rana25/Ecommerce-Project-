import axios from 'axios';

export default function Logout() {
  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      await axios.post('http://localhost:8000/api/logout/', { refresh: refreshToken });

      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');

      alert('Logged out successfully');
      // Example redirect: window.location.href = '/login';
    } catch (err) {
      alert('Logout error');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
    >
      Logout
    </button>
  );
}
