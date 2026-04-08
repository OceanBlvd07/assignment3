import { useState } from "react";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { Alert, Button, Form } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";
import { authenticateUser } from "@/lib/authenticate";
import { getFavourites } from "@/lib/userData";
import { favouritesAtom } from "@/store";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setFavouritesList] = useAtom(favouritesAtom);
  const router = useRouter();

  async function updateAtom() {
    const favourites = await getFavourites();
    setFavouritesList(favourites);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const success = await authenticateUser(user, password);
    setLoading(false);

    if (!success) {
      setError("Login failed. Please check your username and password.");
      return;
    }

    await updateAtom();
    router.push("/");
  }

  return (
    <>
      <PageHeader text="Login" subtext="Log in to access your favourites" />

      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="loginUser">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={user}
            onChange={(event) => setUser(event.target.value)}
            placeholder="Enter username"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="loginPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
          />
        </Form.Group>

        <Button type="submit" disabled={loading} className="w-100">
          {loading ? "Logging in..." : "Login"}
        </Button>
      </Form>
    </>
  );
}
