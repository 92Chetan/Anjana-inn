import { getCurrentUser } from '@/action/getCurrentUser';
import NavbarHolder from './NavbarHolder';

const Navbar = async () => {
  const user = await getCurrentUser();
  return <NavbarHolder userData={user} />;
};

export default Navbar;
