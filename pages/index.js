import fs from 'fs/promises';
import path from 'path'
import Link from 'next/link';
export default function Home(props) {
  const{products}=props
  // console.log(products)
  return (
     <ul>
     {products.map(item =>
       <li key={item.id}>
       <Link href={`/${item.id}`}>{item.title}</Link>
       
       </li>
     )}

     </ul>

    
  )
}
export async function getStaticProps(){
  console.log('Re-Genrated----10--- Second')
  const filePath=path.join(process.cwd(),'Data','dummy-backend.json')
  const jsonData=await fs.readFile(filePath)
  const data=JSON.parse(jsonData)
  if(!data){
    return{
      redirect:{
        destination:'/no-data'
      }
    }
  }
  if(data.products.length===0){
    return{notfound:true}
  }
  return{
    props:{
      products:data.products,
      
        
    
    },
    revalidate:10
  }
}