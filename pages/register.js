import { useState } from "react";
import { useRouter } from "next/router";
import { Alert, Button, Form } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";
import { registerUser } from "@/lib/authenticate";

export default function Register() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (password !== password2) {
      setError("Passwords do not match. Please confirm your password.");
      return;
    }

    setLoading(true);
    const success = await registerUser(user, password, password2);
    setLoading(false);

    if (!success) {
      setError("Registration failed. Please check your details and try again.");
      return;
    }

    router.push("/login");
  }

  return (
    <>
      <PageHeader text="Register" subtext="Register for an account" />

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="registerUser">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={user}
            onChange={(event) => setUser(event.target.value)}
            placeholder="Enter username"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="registerPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="registerPassword2">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={password2}
            onChange={(event) => setPassword2(event.target.value)}
            placeholder="Confirm password"
          />
        </Form.Group>

        <Button type="submit" disabled={loading} className="w-100">
          {loading ? "Registering..." : "Register"}
        </Button>
      </Form>
    </>
  );
}
