import { Card } from "react-bootstrap";

export default function PageHeader({ text, subtext }) {
  return (
    <>
      <Card className="bg-light">
        <Card.Body>
          <h2>{text}</h2>

          {subtext && (
            <h5 className="text-muted">{subtext}</h5>
          )}

        </Card.Body>
      </Card>
      <br />
    </>
  );
}