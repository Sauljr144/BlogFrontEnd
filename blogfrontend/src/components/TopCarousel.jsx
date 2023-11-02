import React, { useEffect } from "react";
import { useState } from 'react';
import  { Image, Carousel, Container, Row } from 'react-bootstrap';
import { getPublishedBlogItems } from "../Services/DataService";

const TopCarousel = () => {


  const [blogItems, setBlogItems] = useState([]);

  useEffect(() =>{
   getThePublishedItems ();
  }, [])

  const getThePublishedItems = async () =>{
    let publishedItems = await getPublishedBlogItems();
    console.log(publishedItems)
    setBlogItems(publishedItems)
  }
    

  return (
    <>
     <Carousel className="mb-5" data-bs-theme="dark">
      {blogItems.map((x, i)=>(
      
      <Carousel.Item key={i} >
      <Image src={x.image} className="carousel-img"/>
        <Carousel.Caption className="carousel-block">
          
          <h3>{x.title}</h3>
          <p>{x.description}</p>
        </Carousel.Caption>
      </Carousel.Item>
       
       ))}
       </Carousel>
       <hr className='line2 mb-5'/>

    

    </>
  )
}

export default TopCarousel