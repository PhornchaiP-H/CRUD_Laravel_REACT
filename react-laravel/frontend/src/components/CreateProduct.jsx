import React, { useState } from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

function createproduct() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState();
    const [validationError, setValidationError] = useState({});

    // console.log(title);
    const changeHandler = (event) => {
        setImage(event.target.files[0]);
    }

    const createProduct = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', image);

        await axios.post(`http://localhost:8000/api/products`, formData).then(({ data }) => {
            Swal.fire({
                icon: "success",
                text: data.message
            })
            navigate("/");
        }).catch(({ response }) => {
            if (response.status === 422) {
                setValidationError(response.data.errors);
            } else {
                Swal.fire({
                    text: response.data.message,
                    icon: "error",
                });
            }
        })
    }



  return (
      <div className='container'>
          <div className="row justify-content-center">
              <div className="col-12 col-sm-12 col-md-6">
                  <div className="card">
                      <div className="card-body">
                          <h4 className="card-title">Create Product</h4>
                          <hr />
                          <div className="from-wrapper">
                              {Object.keys(validationError).jength > 0 && (
                                  <div className="row">
                                      <div className="col-12">
                                          <alert className="alert-danger">
                                              <ul className="mb-0">
                                                  {Object.entries(validationError).map(([key, value]) => (
                                                      < li key={key}>{ value}</li>
                                                  ))}
                                              </ul>
                                          </alert>
                                      </div>
                                  </div>
                              )}
                              <Form onSubmit={createProduct}>
                                  <Row>
                                      <Col>
                                          <Form.Group controlId="Name">
                                              <Form.Label>Title</Form.Label>
                                              <Form.Control type="text" value={title} onChange={(event) => {
                                                  setTitle(event.target.value)

                                              }}/>
                                          </Form.Group>
                                          <Form.Group controlId="Description">
                                              <Form.Label>Description</Form.Label>
                                              <Form.Control as="textarea" rows={3} value={description} onChange={(event) => {
                                                  setDescription(event.target.value)

                                              }} />
                                          </Form.Group>
                                          <Form.Group controlId="Image">
                                              <Form.Label>Title</Form.Label>
                                              <Form.Control type="file" onChange={changeHandler} />
                                          </Form.Group>
                                      </Col>
                                      <Button variant="primary" className='mt-2' size='lg' block='block' type='submit'>
                                          Save
                                      </Button>
                                  </Row>
                              </Form>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      
    </div>
  )
}

export default createproduct