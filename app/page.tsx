import { connectToDB } from "@/lib/mongodb";
import Product, {ProductType} from "@/models/Product";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  await connectToDB()
  const products = await Product.find().lean<ProductType[]>()

  return(
    <main>
      <h1 className="text-3xl text-foreground text-center my-10 font-serif italic">Cruz Baked Confections</h1>
      {products.map((product: any)=>(
        <ProductCard
          key= {product._id.toString()}
          productId= {product._id.toString()}
          name= {product.name}
          price= {product.price}
          description= {product.description}
          imageURL= {product.imageURL}
        />
      ))}
    </main>
  )
}