import { FiShoppingCart } from "react-icons/fi";
import { useCartStore } from "../../stores/useCartStore";

import useFromStore from "../../hooks/useFromStore";

import SearchExampleStandard from "../Searchbar/Searchbar";

import { useState } from "react";
import {IconoUser} from "../IconoUser/IconoUser.tsx"
import iconoUser from '../../../public/images/iconoUser.svg'
import close from '../../../public/images/close.svg'
import config from "../../../public/images/configuracion.svg";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

interface Props {
  onCartIconClick: () => void;
}

export default function Header({ onCartIconClick }: Props) {
  const cart = useFromStore(useCartStore, (state) => state.cart);
  const [stateUser, setStateUser] = useState(false);

  const handleButtonUser = () => {
    setStateUser((prevState) => !prevState);
    console.log(stateUser);
  };

  return (
    <header
      className=" 
    z-10 bg-white text-gray-700 
    py-4 flex items-center 
    justify-between h-18 
    sticky top-0 shadow"
    >
      <nav className="container mx-auto md:w-10/12 px-4 flex md:justify-between justify-left items-center">
        <span className="text-lg font-semibold hidden md:block">
          <img
            src={logo}
            className="w-28 cursor-pointer hover:scale-105 hover:drop-shadow-sm transition-all ease duration-200"
            alt="Lachoco-Latera logo"
            onClick={() => (window.location.href = "/")}
          />
        </span>
        <div className="hover:drop-shadow transition-all ease ">
          <SearchExampleStandard />
        </div>
        <div className="flex flex-row items-center gap-10">
          <div className="relative  hidden md:block">
            <button
              type="button"
              title="Mini Cart"
              className="text-gray-800 text-xl flex items-center hover:scale-110 transition-all ease"
              onClick={onCartIconClick}
            >
              <FiShoppingCart size={28} />
              <div className="text-white rounded-full bg-gray-700 w-5 h-5 text-sm -ml-[0.7em] -mt-5">
                {cart?.length}
              </div>
            </button>
          </div>

          <div className="hidden md:block">
            {stateUser ? (
              <button onClick={handleButtonUser}>
                <img
                  src={close}
                  alt=""
                  className="w-[25px] h-[25px] transition-all ease duration-100"
                />
              </button>
            ) : (
              <button onClick={handleButtonUser}>
                <img src={iconoUser} alt="" className="w-[23px] h-[23px]" />
              </button>
            )}
          </div>
          {/* BOTON DE CONFIGURACION */}
          <div className="hidden md:block">
            <button>
              <img src={config} alt="" className="w-[30px] h-[30px]" />
            </button>
          </div>
        </div>
        <div>
        <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
        </div>
      </nav>
      {stateUser ? (
        <div className="w-[300px] h-[100px] absolute mt-[150px] right-0 bg-gray-300 z-20 flex flex-col justify-evenly">
          <IconoUser />
        </div>
      ) : null}
    </header>
  );
}
