import { Link } from "react-router-dom";

function Button({ children, to,type,onClick }) {
  

    const base="bg-yellow-400 inline-block  mt-4 rounded-full text-stone-800 font-semibold uppercase hover:bg-yellow-300 transition-colors duration-300 hover:text-stone-600 tracking-wide focus:outline-none focus:ring  focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed ";

    const classType={
      primary:base+" md:px-6 md:py-4 px-4 py-3",
      small:base+ " md:px-5 sm:py-3 px-4 py-2",
      secondary:"inline-block  mt-4 rounded-full border-2 border-stone-500 text-stone-500 font-semibold uppercase hover:bg-stone-300 transition-colors duration-300 hover:text-stone-800 tracking-wide focus:outline-none focus:ring  focus:ring-stone-500 focus:ring-offset-2 disabled:cursor-not-allowed md:px-6 md:py-4 px-4 py-3",
      round:base+ " md:px-2 sm:py-2 px-2.5 py-2",
    };
  if (to)
    return (
      <Link to={to} className={classType[type]}>
        {children}
      </Link>
    );

    if(onClick)  return <button onClick={onClick} className={classType[type]}>{children}</button>;

  return <button className={classType[type]}>{children}</button>;
}

export default Button;
