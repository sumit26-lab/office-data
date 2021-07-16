import React, { Fragment } from 'react'
import fs from 'fs/promises';
import path from 'path';



function ProductDetail(props) {
    const{loadingProduct}=props
    if(!loadingProduct){
        return(<p>Loding Page........</p>)
    }
    return (
        <Fragment>
            <h1 style={{textAlign:'center'}}>
            {loadingProduct.title}</h1>
            <br/>
            <p>{loadingProduct.Discription}</p>
            
        </Fragment>
    )
}

 export async function getStaticProps(context){
     const{params}=context
     const productId=params.pid;
     const filePath =path.join(process.cwd(),'Data','dummy-backend.json')
     const jsonData=await fs.readFile(filePath)
     const data=JSON.parse(jsonData);
     const product=data.products.find(product=>product.id ===productId)
     return{
         props:{
             loadingProduct:product
         }
     }


 }
 export async function getStaticPaths(){
     return{
         paths:[
             {params:{pid:'p1'}},
    
         ],
         fallback:true
     }
 }
 export default ProductDetail