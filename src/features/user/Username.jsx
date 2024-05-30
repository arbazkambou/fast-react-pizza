import { useSelector } from "react-redux";

function Username() {
  const username =useSelector((store)=>store.user.username);
  if(username==="") return;
  return (
    <p className=" text-sm font-semibold uppercase hidden sm:block">{username}</p>
  );
}

export default Username;
