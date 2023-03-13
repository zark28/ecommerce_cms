import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useStateContext } from '../context/StateContext'
const CategoryNavigator = () => {

    const [data,setData]=useState()
    const {allData}=useStateContext()
    useEffect(()=>{
           setData(allData) 
    })
    
    const allProducts=data&&data[0]?.products
    const allCategories=[]
    allProducts?.forEach(element => {
        if(allCategories.includes(element.category)) return
        else{
            allCategories.push(element.category)
        }       
    });
    console.log(allCategories);

  return (
    <div className='navbar-container'>
        <div className='category-nav'>

        
        
        {
        allCategories?.map((type,index)=>(
            <Link href={`/category/${type}`} key={index}>{type}</Link>
        ))    
        }
        </div>
    </div>
  )
}

export default CategoryNavigator