import React, { useEffect } from "react";
import { useState } from "react";
import { Container, Row, Col, Image, Carousel } from "react-bootstrap";
import { getPublishedBlogItems } from "../Services/DataService";
import TopCarousel from "./TopCarousel";


const BlogPage = () => {
  const [blogItems, setBlogItems] = useState([]);

  useEffect(() =>{
    getThePublishedItems();
  }, [])

  const getThePublishedItems = async () =>{
    let publishedItems = await getPublishedBlogItems();
    console.log(publishedItems)
    setBlogItems(publishedItems)
  }

  return (
    <Container className="p-0">
     <TopCarousel/>
      <Row>
        <Col>

          
          {blogItems.map((item, i) => (
            <div key={i}>
            { i % 2 == 0 ? (
            <Row style={{border: 'solid'}}>
              <Col md={6}>
                <Row>
                  <Col md={12} className="d-flex justify-content-center"><h2>{item.title}</h2></Col>
                  <Col md={12} style={{border: 'solid'}}>
                    <Row>
                      <Col md={6} className="d-flex justify-content-center">{item.publisherName}</Col>
                      <Col md={6} style={{border: 'solid'}}><p>{item.date}</p></Col>
                    </Row>
                  </Col>
                </Row>
                <Col md={12} className="d-flex justify-content-center"><img style={{width: '100%'}} src={item.image}/></Col>
              </Col>
              <Col md={6} className="d-flex justify-content-center" style={{border: 'solid'}}><h2>{item.description}</h2></Col>
            </Row>)
                
            :
           
            <Row key={i} style={{border: 'solid'}}>
            <Col md={6} className="d-flex justify-content-center" style={{border: 'solid'}}><h2>{item.description}</h2></Col>
              <Col md={6}>
                <Row>
                  <Col md={12} className="d-flex justify-content-center"><h2>{item.title}</h2></Col>
                  <Col md={12} style={{border: 'solid'}}>
                    <Row>
                      <Col md={6} className="d-flex justify-content-center">{item.publisherName}</Col>
                      <Col md={6} style={{border: 'solid'}}><p>{item.date}</p></Col>
                    </Row>
                  </Col>
                </Row>
                <Col md={12} className="d-flex justify-content-center"><img style={{width: '100%'}} src={item.image}/></Col>          
              </Col>  
            </Row>
      
             }
              </div>
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default BlogPage;
