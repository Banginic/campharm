
import { signOut } from "next-auth/react";

export default  function LogoutPharmacyButton() {

  function handleLogout(){
    signOut({
      redirect: true,
      callbackUrl: '/pharmacy/login'
    })
  }
  return (
    <button onClick={handleLogout} className="cursor-pointer ">Log out</button>

  );
}
