import { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import { Product } from "@/types.d";
import Checkout from "../../../components/Checkout/Checkout";
import { FaShareSquare } from "react-icons/fa";
import { toast } from "sonner";
import { HiHeart } from "react-icons/hi";
import { SlHeart } from "react-icons/sl";
import { LuPackageOpen } from "react-icons/lu";
import { GrDeliver } from "react-icons/gr";
import { FaBookOpen } from "react-icons/fa";

const ProductsDetail = ({ info }: { info: any }) => {
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [productInfo, setProductInfo] = useState<any>(null);
  const [heartColor, setHeartColor] = useState("transparent");

  const altLabel = ["Solo Online", "Nuevo", "Importado"];
  const handleImageClick = (product: Product) => {
    setModalProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalProduct(null);
  };

  useEffect(() => {
    if (info) {
      setProductInfo(info);
    }
  }, [info]);

  if (!productInfo) {
    return <div>Loading...</div>;
  }
  const handleHeartClick = () => {
    setHeartColor((prevColor) => {
      if (prevColor === "transparent") {
        toast.success("Añadido a favoritos");
        return "red";
      } else {
        toast.error("Se ha eliminado de favoritos");
        return "transparent";
      }
    });
  };

  console.log(info);
  return (
    <div className="flex flex-col md:px-48 px-12 md:py-10 ">
      <div className="flex flex-col md:flex-row items-center md:justify-between">
        <h2 className="font-semibold md:text-3xl ">{productInfo?.name}</h2>
        <div className="flex items-center gap-2 ease transition-all">
          <a
            className="flex flex-row cursor-pointer items-center hover:scale-110 hover:px-2 gap-2 transition-all ease"
            href="whatsapp://send?text=Mirá la nueva página de lachoco-latera: https://lachoco-front.vercel.app"
            data-action="share/whatsapp/share"
          >
            <FaShareSquare size={16} />
            {"Compartir"}{" "}
          </a>
          <div
            className="relative group flex cursor-pointer items-center gap-2 hover:scale-110 hover:px-2 transition-all ease"
            onClick={handleHeartClick}
          >
            <HiHeart
              id="firstHeart"
              size={24}
              className={`cursor-pointer group-hover:scale-[1.25] ease-in-out duration-300 drop-shadow absolute scale-[1.18] ${
                heartColor === "red" ? "text-red-500" : "opacity-30"
              }`}
            />
            <SlHeart
              id="secondHeart"
              size={24}
              color="white"
              className="cursor-pointer group-hover:scale-[1.1] ease-in-out duration-300 drop-shadow z-30"
            />
            {"Añadir a favoritos"}
          </div>
        </div>
      </div>
      <Carousel
        axis="horizontal"
        showArrows={true}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        infiniteLoop
        swipeable={true}
        emulateTouch
        onClickItem={() => handleImageClick(productInfo)}
      >
        {productInfo.images?.map((image: any, index: number) => (
          <div key={index} className="relative rounded-xl ">
            <img
              alt={`Product image ${index + 1}`}
              src={image?.img || ""}
              className="max-w-80 max-h-80 object-cover rounded-xl outline-none"
            />
          </div>
        ))}
      </Carousel>
      <div className="flex md:flex-row flex-col items-center md:items-start justify-between">
        <div className="flex flex-col pr-10">
          <ul className="flex gap-2 ">
            {altLabel.map((label: any, index: number) => (
              <li
                key={index}
                className="relativ bg-red-900 font-bold text-white rounded-3xl shadow-xl p-2 hover:scale-105 cursor-pointer transition-all ease"
              >
                {label}
              </li>
            ))}
          </ul>
          <p className="self-start max-w-2xl pt-12 md:font-semibold">
            <h2 className="flex gap-2 text-3xl">
              <LuPackageOpen />
              Presentación
            </h2>
            <p className=""> {productInfo?.description}</p>
          </p>
          <p className="self-start max-w-2xl pt-12 md:font-semibold">
            <h2 className="flex gap-2 text-3xl">
              <FaBookOpen />
              Descripción
            </h2>
            <p className=""> {productInfo?.description}</p>
          </p>
          <p className="self-start max-w-2xl pt-12 md:font-semibold">
            <h2 className="flex gap-2 text-3xl">
              <GrDeliver />
              Envios
            </h2>
            <p className=""> {productInfo?.description}</p>
          </p>
        </div>

        <div className="flex">
          <Checkout
            price={productInfo?.price}
            currency={productInfo?.currency}
            flavors={productInfo?.flavors}
          />
        </div>
      </div>
      {showModal && (
        <div
          className="modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-40"
          onClick={closeModal}
        >
          <div
            className="modal-content p-4 rounded-lg relative md:w-1/2 z-50 flex justify-center items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Carousel
              axis="horizontal"
              showArrows={true}
              showThumbs={false}
              showIndicators={false}
              showStatus={false}
              infiniteLoop
              swipeable={true}
              emulateTouch
              useKeyboardArrows={true}
            >
              {modalProduct?.images?.map((image, i) => {
                return (
                  <div key={i}>
                    <img
                      alt={`Modal product image ${i + 1}`}
                      src={image?.img || ""}
                      className="object-cover rounded-lg"
                    />
                  </div>
                );
              })}
            </Carousel>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsDetail;