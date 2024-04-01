import { useNavigate,  } from 'react-router-dom';
import { useEffect } from 'react';

export default function withAuth(Component:any) {
  return function WithAuth(props:any) {
    const router = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token');
 
      if (!token) {
        router('/login');  
      }
    }, []);

    return <Component {...props} />;
  };
}