import SearchForm from "@/components/SearchForm";

/**
 * Render the home page containing a heading, descriptive text, and a prefilled search form.
 *
 * @param searchParams - A promise that resolves to an object with an optional `query` string used to prefill the `SearchForm`. The `query` may be `undefined`.
 * @returns The React element for the home page, including the main heading, subheading, and `SearchForm` initialized with the derived `query`.
 */
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup,
          <br /> Connect With Entrepreneurs
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches, and Get Noticed in virtual
        </p>
        <SearchForm query={query} />
      </section>
    </>
  );
}