import { Button, Form } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useState } from "react";
import { useAddPostMutation } from "../slices/postApiSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const [addPost, { isLoading }] = useAddPostMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addPost({ title, body }).unwrap();
      toast.success("New post added successfully");
      navigate("/post");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return (
    <FormContainer>
      <h1 className="text-center mb-5">Add new post</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="body">
          <Form.Label>Title</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            placeholder="Post title"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          {isLoading ? <Loader /> : "Add post"}
        </Button>
      </Form>
    </FormContainer>
  );
}
