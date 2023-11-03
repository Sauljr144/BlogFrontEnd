import React, { useEffect } from "react";
import { useState } from "react";
import { Container, Row, Col, Image, Card } from "react-bootstrap";
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
     <Row xs={1} md={2} className="g-4 mb-5">
      {blogItems.map((x, i) => (
        <Col key={i}>
          <Card>
            <Card.Img variant="top" src={x.image} />
            <Card.Body>
              <Card.Title className="mb-3 mt-2">{x.title}</Card.Title>
              <Card.Text>
                {x.description}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
    </Container>
  );
};

export default BlogPage;
