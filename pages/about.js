import Card from "react-bootstrap/Card";
import BookDetails from "@/components/BookDetails";
import PageHeader from "@/components/PageHeader";

export async function getStaticProps() {

  const res = await fetch(
    "https://openlibrary.org/works/OL1655077W.json"
  );

  const data = await res.json();

  return {
    props: {
      book: data
    }
  };
}

export default function About({ book }) {

  return (
    <>
      <PageHeader text="About the Developer Marko Andrukhiv" />

      <Card>
        <Card.Body>

          <p>
            I am a BSD student interested in web development using React and Next.js.
          </p>

        </Card.Body>
      </Card>

      <br />

      <BookDetails
        book={book}
        workId="OL1655077W"
        showFavouriteBtn={false}
      />

    </>
  );
}