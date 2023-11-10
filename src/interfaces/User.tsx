import { User } from "firebase/auth";

interface UserObj {
  id: string | undefined;
  name: string;
  role: string;
  user: User | null
}

export default UserObj