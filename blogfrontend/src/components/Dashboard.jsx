import {
  Button,
  Container,
  Modal,
  Form,
  Row,
  Col,
  Accordion,
  ListGroup,
  Spinner,
} from "react-bootstrap/";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AddBlogItems,
  GetBlogItemsByUserId,
  LoggedInData,
  checkToken,
  getBlogItems,
  updateBlogItems,
} from "../Services/DataService";

const Dashboard = () => {
  let navigate = useNavigate();

  useEffect(() => {
    //useEffect is the first thing that fires on load
    //put any logic we want to fire on onload
    //our effect will fire if we have a change in the state in our dependancy
    //rerouting the user to the Login page if no user Token
    if (!checkToken()) {
      navigate("/Login");
    } else {
      setTimeout(async () => {
        let loggedInData = LoggedInData();
        setUserId(loggedInData.userId)
        setPublishername(loggedInData.publisherName)
        console.log(loggedInData);
        let userBlogItems = await GetBlogItemsByUserId(loggedInData.userId);
        setBlogItems(userBlogItems);
        
        console.log(userBlogItems);
        setIsLoading(false);
      }, 1000);
    }
    // let userInfo = LoggedInData();
    // console.log(userInfo);
  }, []);

  //functions
  const handleSetTitle = (e) => setBlogTitle(e.target.value);
  const handleDescription = (e) => setBlogDescription(e.target.value);
  const handleTag = (e) => setBlogTags(e.target.value);
  const handleCategory = (e) => setBlogCategory(e.target.value);
  // const handleSaveImage = ({target}) => setBlogImage(target.files[0])
  const handleClose = () => setShow(false);
  const handleShow = (
    e,
    {
      id,
      userId,
      publisherName,
      title,
      image,
      description,
      category,
      tag,
      isDeleted,
      isPublished,
    }
  ) => {
    setShow(true);
    if (e.target.textContent === "Add Blog Item") {
      setEdit(false);
    } else {
      setEdit(true);
    }
    setBlogID(id);
    setUserId(userId);
    setPublishername(publisherName);
    setBlogTitle(title);
    setBlogDescription(description);
    setBlogImage(image);
    setBlogCategory(category);
    setBlogTags(tag);
    setIsDeleted(isDeleted);
    setIsPublished(isPublished);
    // console.log(blogData)
  };

  const [blogUserId, setUserId] = useState(0);
  const [blogPublishername, setPublishername] = useState("");

  //create useStaes for our forms
  const [blogTitle, setBlogTitle] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogDescription, setBlogDescription] = useState("");
  const [blogCategory, setBlogCategory] = useState("");
  const [blogTags, setBlogTags] = useState("");
  const [blogID, setBlogID] = useState(0);
  // const [userId, setUserId] = useState(0);
  // const [Publishername, setPublishername] = useState("");

  //bools
  const [show, setShow] = useState(false);
  const [edit, setEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  const [blogItems, setBlogItems] = useState([]);

  const handleSave = async ({ target: { textContent } }) => {
    // let { publisherName, userId } = LoggedInData();

    const Published = {
      Id: blogID,
      UserId: blogUserId,
      PublisherName: blogPublishername,
      Title: blogTitle,
      Image: blogImage,
      Description: blogDescription,
      Date: new Date(),
      Category: blogCategory,
      Tag: blogTags,
      IsPublished:
        textContent == "Save" || textContent == "Save Changes" ? false : true,
      IsDeleted: false,
    };

    console.log(Published);
    handleClose();

    let result = false;
    if (edit) {
      result = await updateBlogItems(Published);
    } else {
      result = await AddBlogItems(Published);
    }

    // let result = await AddBlogItems(Published);
    if (result) {
      let userBlogItems = await GetBlogItemsByUserId(blogUserId);
      setBlogItems(userBlogItems);
      console.log(userBlogItems, "yes it works");
    }
    else{
      alert(`Blog item not ${edit? "updated": "added"}`)
    }
  };

  // const handleSaveWithUnpublish = async () => {
  //   let { publisherName, userId } = LoggedInData();

  //   const notPublished = {
  //     Id: 0,
  //     UserId: userId,
  //     PublisherName: publisherName,
  //     Title: blogTitle,
  //     Image: blogImage,
  //     Description: blogDescription,
  //     Date: new Date(),
  //     Category: blogCategory,
  //     Tag: blogTags,
  //     IsPublished: false,
  //     IsDeleted: false,
  //   };
  //   console.log(notPublished);
  //   handleClose();
  //   let result = await AddBlogItems(notPublished);
  //   if (result) {
  //     let userBlogItems = await GetBlogItemsByUserId(userId);
  //     setBlogItems(userBlogItems);
  //   }
  //   AddBlogItems(notPublished);
  // };

  const handlePublish = async (item) => {
    console.log("first");
    item.isPublished = !item.isPublished;

    let result = await updateBlogItems(item);

    if (result) {
      let userBlogItems = await GetBlogItemsByUserId(blogUserId);
      setBlogItems(userBlogItems);
      console.log(userBlogItems);
    } else alert(`Blog item not ${edit ? "updated" : "added"}`);
  };

  //handle delete
  const handleDelete  = async (item) =>{
    console.log("first");
    item.isDeleted = !item.isDeleted;

    let result = await updateBlogItems(item);

    if (result) {
      let userBlogItems = await GetBlogItemsByUserId(blogUserId);
      setBlogItems(userBlogItems);
      console.log(userBlogItems);
    } else alert(`Blog item not ${edit ? "updated" : "added"}`);
  }

  //handle our imag
  const handleImage = async (e) => {
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log(reader.result);
      setBlogImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      <Container>
        <Button
          className="me-3"
          variant="outline-primary"
          onClick={(e) =>
            handleShow(e, {
              id: 0,
              userId: blogUserId,
              publisherName: blogPublishername,
              image: "",
              title: "",
              description: "",
              category: "",
              tag: "",
              isDeleted: false,
              isPublished: false,
            })
          }
        >
          Add Blog Item
        </Button>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header  closeButton>
            <Modal.Title >
              {edit ? "Edit" : "Add"} Blog Item
            </Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <Form>
              <Form.Group className="mb-3" controlId="Title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Title"
                  value={blogTitle}
                  onChange={handleSetTitle}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="Description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Description"
                  value={blogDescription}
                  onChange={handleDescription}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="Category">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={blogCategory}
                  onChange={handleCategory}
                >
                  <option>Select Category</option>
                  <option value="Food">Food</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Sports">Sports</option>
                  <option value="Tech">Tech</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="Tags">
                <Form.Label>Tags</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Tags"
                  value={blogTags}
                  onChange={handleTag}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="Image">
                <Form.Label>Pick an Image</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="SeleteImage from file"
                  accept="image/png, image/jpg"
                  onChange={handleImage}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer >
            <Button variant="outline-secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="outline-primary" onClick={handleSave}>
              {edit ? "Save Changes" : "Save"}
            </Button>
            <Button variant="outline-primary" onClick={handleSave}>
              {edit ? "Save Changes" : "Save"} and Publish
            </Button>
          </Modal.Footer>
        </Modal>
        <Button variant="outline-primary" onClick={handleShow}>
          Edit Blog Item
        </Button>
        <Row>
          <Col>
            {isLoading ? (
              <>
                <h1>Loading ....</h1>{" "}
                <Spinner animation="border" variant="info" />
              </>
            ) : blogItems.length == 0 ? (
              <h1 className="text-center">
                No Blog Items. Add a Blog Item Above
              </h1>
            ) : (
              <Accordion defaultActiveKey={["0", "1"]} alwaysOpen>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Published</Accordion.Header>
                  <Accordion.Body
                   
                  >
                    {blogItems.map((x, i) =>
                      x.isPublished && !x.isDeleted ? (
                        <ListGroup key={i}>
                          {x.title}
                          <Col className="d-flex justify-content-end">
                            <Button variant="outline-danger mx-2" onClick={() => handleDelete(x)}>
                              Delete
                            </Button>
                            <Button
                              variant="outline-info mx-2"
                              onClick={(e) => handleShow(e, x)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outline-primary mx-2"
                              onClick={() => handlePublish(x)}
                            >
                              Unpublish
                            </Button>
                          </Col>
                        </ListGroup>
                      ) : null
                    )}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Unpublished</Accordion.Header>
                  <Accordion.Body
                    
                  >
                    {blogItems.map((x, i) =>
                      !x.isPublished & !x.isDeleted ? (
                        <ListGroup key={i}>
                          {x.title}
                          <Col className="d-flex justify-content-end">
                            <Button variant="outline-danger mx-2" onClick={() => handleDelete(x)}>
                              Delete
                            </Button>
                            <Button
                              variant="outline-info mx-2"
                              onClick={(e) => handleShow(e, x)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="outline-primary mx-2"
                              onClick={() => handlePublish(x)}
                            >
                              Publish
                            </Button>
                          </Col>
                        </ListGroup>
                      ) : null
                    )}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
