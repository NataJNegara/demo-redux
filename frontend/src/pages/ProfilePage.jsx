import { useEffect, useState } from "react";
import FormContainer from "../components/FormContainer";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlices";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { useUpdateUserMutation } from "../slices/userApiSlice";

export default function ProfilePage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.username, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password is not match");
    } else {
      try {
        const res = await updateUser({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Profile updated!");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1 className="text-center">Update Profile</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="jhon doe"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="ConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          {isLoading ? <Loader /> : "Update"}
        </Button>
      </Form>
    </FormContainer>
  );
}
