import { useRouter } from "next/router";
import useSWR from "swr";
import PageHeader from "@/components/PageHeader";
import { Table, Pagination } from "react-bootstrap";
import Link from "next/link";

export default function Books() {

  const router = useRouter();

  const page = parseInt(router.query.page) || 1;

  let queryString = { ...router.query };
  delete queryString.page;

  let qParts = [];

  Object.entries(queryString).forEach(([key, value]) => {
    qParts.push(`${key}:${value}`);
  });

  if (qParts.length > 0) {
    queryString = qParts.join(" AND ");
  }

  const { data, error } = useSWR(
    router.isReady ? `https://openlibrary.org/search.json?q=${queryString}&page=${page}&limit=10` : null
  );

  if (!router.isReady) return null;

  if (error) return <p>Error loading data</p>;
  if (!data) return <p>Loading...</p>;

  const queryParams = Object.entries(router.query)
    .filter(([key]) => key !== "page")
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ");

  const previousPage = () => {

    const query = { ...router.query, page: page - 1 };

    router.push({
      pathname: "/books",
      query
    });

  };

  const nextPage = () => {

    const query = { ...router.query, page: page + 1 };

    router.push({
      pathname: "/books",
      query
    });

  };

  return (
    <>
      <PageHeader
        text="Search Results"
        subtext={queryParams}
      />

      <p>{data.numFound} results found</p>

      <Table striped bordered hover>

        <thead>
          <tr>
            <th>Title</th>
            <th>Published</th>
          </tr>
        </thead>

        <tbody>

          {data.docs.map((book) => {

            const workId = book.key.replace("/works/", "");

            return (
              <tr key={book.key}>

                <td>
                  <Link href={`/works/${workId}`}>
                    {book.title}
                  </Link>
                </td>

                <td>
                  {book.first_publish_year || "N/A"}
                </td>

              </tr>
            );

          })}

        </tbody>

      </Table>

      <Pagination>

        <Pagination.Prev
          onClick={previousPage}
          disabled={page <= 1}
        />

        <Pagination.Item active>
          {page}
        </Pagination.Item>

        <Pagination.Next
          onClick={nextPage}
        />

      </Pagination>

    </>
  );
}