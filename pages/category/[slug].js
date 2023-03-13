import React, { useEffect, useState } from 'react'
import {FooterBanner, HeroBanner, Product,} from '../../components'
import { useStateContext } from '../../context/StateContext'
import {client, urlFor} from '../../lib/client'
const Category = ({products,category,allProducts}) => {
  const [data,setData]=useState()
  const {allData}=useStateContext()
  useEffect(()=>{
    setData(allData) 
    localStorage.setItem('productData',JSON.stringify(allProducts))
  },[])
  const bannerData=data&&data[1]?.bannerData
  console.log(bannerData);



  return (
    <>
    {/* <HeroBanner heroBanner={bannerData?.length && bannerData[0]} /> */}
    <div className='products-heading'>
      <h2>Best Quality Products</h2>
      <p>{category}</p>
    </div>
    <div className='products-container'>
      {
        products?.map((product)=><Product key={product._id} product={product} />)
      }
    </div>
    {/* <FooterBanner footerBanner={bannerData&&bannerData[0]}/> */}
    </>
    
  )
  
}

export const getStaticPaths=async()=>{
  const query=`*[_type == "product"] {
    category
}`;

const products= await client.fetch(query);
  const paths=products.map((product)=>({
      params:{
          slug:product.category
      }
  }))
  return{
      paths,
      fallback:'blocking'
  }
}
export const getStaticProps =async({params:{slug}})=>{
  const query=`*[_type == "product" && category == '${slug}']`
  const productsQuery ='*[_type=="product"]'
  const products =await client.fetch(query)
  const allProducts =await client.fetch(productsQuery)
const category=slug

return{
  props:{products,category,allProducts}
}
}


export default Category