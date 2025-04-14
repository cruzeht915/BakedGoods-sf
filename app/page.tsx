import { connectToDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  await connectToDB()
  const products = await Product.find().lean()

  return(
    <main>
      {products.map((product: any)=>(
        <ProductCard
          key= {product._id}
          name= {product.name}
          price= {product.price}
          description= {product.description}
          imageURL= {product.imageURL}
          quantityAvailable= {product.quantityAvailable}
        />
      ))}
    </main>
  )
}