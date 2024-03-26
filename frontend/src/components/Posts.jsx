import { Card } from "react-bootstrap";
import { useGetPostsQuery } from "../slices/postApiSlice";

export default function Posts() {
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery();

  let content;

  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = posts.map((post) => (
      <Card key={post._id}>
        <Card.Header className="px-4 fst-italic">
          Post by. {post.username}
        </Card.Header>
        <Card.Body className="p-4">
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.body}</Card.Text>
        </Card.Body>
      </Card>
    ));
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <div className="mt-5 d-flex gap-3 flex-column w-75 m-auto">{content}</div>
  );
}
