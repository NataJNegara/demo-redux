import { Button, Form } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  useGetUserPostsQuery,
  useUpdatePostMutation,
} from "../slices/postApiSlice";
import Loader from "../components/Loader";

export default function EditPostPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const navigate = useNavigate();
  const { postId } = useParams();
  const {
    data: userPosts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserPostsQuery();

  useEffect(() => {
    if (isSuccess) {
      const targetPost = userPosts.filter((post) => post._id === postId);
      setTitle(targetPost[0].title);
      setBody(targetPost[0].body);
    }
  }, [isSuccess]);

  const [updatePost, { isLoading: isEditing }] = useUpdatePostMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePost({ id: postId, title, body }).unwrap();
      toast.success("Post updated successfully");
      navigate("/post");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return (
    <FormContainer>
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <Loader />
        </div>
      ) : (
        <>
          {" "}
          <h1 className="text-center mb-5">Edit post</h1>
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
              {isEditing ? <Loader /> : "Edit post"}
            </Button>
          </Form>
        </>
      )}
    </FormContainer>
  );
}
