/*********************************************************************************
* BTI425 – Assignment 3
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Marko Andrukhiv Student ID: 178008231 Date: 8th April 2026
*
* Vercel App (Deployed) Link: _____________________________________________________
*
********************************************************************************/
import PageHeader from "@/components/PageHeader";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export default function Home() {

  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {

    router.push({
      pathname: "/books",
      query: Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value !== "")
      )
    });

  };

  return (
    <>
      <PageHeader
        text="Search Books"
        subtext="Find books using the OpenLibrary API"
      />

      <Form onSubmit={handleSubmit(onSubmit)}>

        <Row>

          <Col xs={12}>
            <Form.Group className="mb-3">

              <Form.Label>Author</Form.Label>

              <Form.Control
                {...register("author", { required: "Author is required" })}
                className={errors.author ? "is-invalid" : ""}
              />

              {errors.author &&
                <div className="invalid-feedback">
                  {errors.author.message}
                </div>
              }

            </Form.Group>
          </Col>

        </Row>

        <Row>

          <Col lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control {...register("title")} />
            </Form.Group>
          </Col>

          <Col lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control {...register("subject")} />
            </Form.Group>
          </Col>

        </Row>

        <Row>

          <Col lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>Language</Form.Label>
              <Form.Control {...register("language")} />
            </Form.Group>
          </Col>

          <Col lg={6}>
            <Form.Group className="mb-3">
              <Form.Label>First Publish Year</Form.Label>
              <Form.Control type="number" {...register("first_publish_year")} />
            </Form.Group>
          </Col>

        </Row>

        <Button type="submit" className="w-100">
          Search
        </Button>

      </Form>
    </>
  );
}