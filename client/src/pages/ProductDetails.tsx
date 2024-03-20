import { OrderItem, Product } from "@/utils/Types & Interfaces";
import { Link, useLoaderData } from "react-router-dom";
import { Heart, Plus, Minus } from "lucide-react";
import { useEffect, useState } from "react";
import { Capitalize } from "@/utils/Capitalize";
import useLocalStorage from "@/hooks/useLocalStorage";

const ProductDetails = () => {
  const product = useLoaderData() as Product;
  const [orderItem, setOrderItem] = useState<OrderItem>({
    productId: product.productsId,
    quantity: 1,
    name: product.name,
    price: product.price,
    image: product.image,
  });
  const [cart, setCart] = useLocalStorage("cart", []);

  const addToCart = () => {
    if (
      cart.some((item: OrderItem) => item.productId === orderItem.productId)
    ) {
      setCart((prev: OrderItem[]) =>
        prev.map((item: OrderItem) => {
          if (item.productId === orderItem.productId) {
            return {
              ...item,
              quantity: orderItem.quantity,
            };
          }
          return item;
        })
      );
    } else {
      setCart([...cart, orderItem]);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCart = (operation: string) => {
    setOrderItem((prevOrderItem) => ({
      ...prevOrderItem,
      quantity:
        operation === "p"
          ? prevOrderItem.quantity >= 10
            ? 10
            : prevOrderItem.quantity + 1
          : prevOrderItem.quantity <= 1
          ? prevOrderItem.quantity
          : prevOrderItem.quantity - 1,
    }));
  };

  return (
    <div className="w-screen md:w-[70vw] lg:grid grid-cols-2 m-auto gap-5 flex flex-col font-inter mt-5 lg:mt-10 mb-40">
      <div className="flex flex-col w-full gap-2 lg:col-span-1">
        <div className="flex gap-3 mb-2 ml-2 lg:ml-0">
          <Link to={"/dogs"} className="font-[500] hover:underline">
            {Capitalize(product.pet.name)}
          </Link>
          <span>{" > "} </span>
          <Link
            to={`/dogs?category=${product.category.name}`}
            className="font-[500] hover:underline"
          >
            {Capitalize(product.category.name)}
          </Link>
        </div>
        <img
          src={product.image}
          alt="product image"
          className="w-[80%] m-auto lg:m-0"
        />
      </div>
      <div className="flex flex-col gap-8 px-3 mt-2 lg:col-span-1 lg:mt-10">
        <h1 className="text-3xl font-[450] text-zinc-800 dark:text-zinc-200 font-inter">
          {product.name}
        </h1>
        <div className="flex gap-6">
          {product.stock >= 1 ? (
            <span className="font-semibold text-green-500">In stock</span>
          ) : (
            <span className="text-red-500">Out of stock</span>
          )}
          <hr className="h-6 border-r border-zinc-400" />
          <button
            className="text-zinc-500 dark:text-zinc-300 hover:underline"
            onClick={() =>
              window.scrollTo({
                top: document.getElementById("description")!.offsetTop,
                behavior: "smooth",
              })
            }
          >
            Check Description
          </button>
        </div>
        <hr className="border-b border-b-zinc-100" />
        <div className="flex items-center justify-between px-3">
          <span className="text-2xl font-semibold texdt-zinc-800 dark:text-zinc-200">
            ${product.price}
          </span>
          <button className="p-2 border rounded-full shadow-xl border-zinc-200 dark:border-zinc-700 dark:bg-slate-900 text-sky-500 ">
            <Heart size={30} />
          </button>
        </div>
        <div className="flex gap-3 px-3 lg:mt-14">
          <div className="flex border w-fit">
            <button
              className="flex items-center p-2 border"
              onClick={() => handleCart("m")}
            >
              <Minus size={25} />
            </button>
            <span className="w-12 px-4 py-2 text-lg text-center border">
              {orderItem.quantity}
            </span>
            <button
              className="flex items-center p-2 border"
              onClick={() => handleCart("p")}
            >
              <Plus size={25} />
            </button>
          </div>
          <button
            className="flex-1 text-lg text-white rounded-lg bg-sky-600"
            onClick={addToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
      <hr className="col-span-2 mt-10 border-b border-zinc-200" />
      <div className="col-span-2" id="description">
        <h2 className="text-xl font-semibold">Description</h2>
        <p className="mt-6 text-lg">{product.description}</p>
      </div>
    </div>
  );
};
export default ProductDetails;
