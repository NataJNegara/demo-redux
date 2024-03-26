import { Button, Card } from "react-bootstrap";
import {
  useDeletePostMutation,
  useGetUserPostsQuery,
} from "../slices/postApiSlice";
import toast from "react-hot-toast";
import { LinkContainer } from "react-router-bootstrap";

export default function UserPostsPage() {
  const {
    data: userPost,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserPostsQuery();

  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      toast.success("Post deleted successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = userPost.map((post) => (
      <Card key={post._id}>
        <Card.Header className="px-4 fst-italic">
          Post by. {post.username}
        </Card.Header>
        <Card.Body className="p-4">
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.body}</Card.Text>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-end gap-2">
          <Button
            variant="danger"
            disabled={isDeleting}
            onClick={() => handleDelete(post._id)}>
            Delete
          </Button>

          <LinkContainer to={`/post/edit/${post._id}`}>
            <Button variant="warning">Edit</Button>
          </LinkContainer>
        </Card.Footer>
      </Card>
    ));
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <div className="mt-5 d-flex gap-3 flex-column w-75 m-auto">{content}</div>
  );
}
