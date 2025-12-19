import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

/**
 * Render the Home page containing a search form and a list of startups based on the provided search query.
 *
 * @param searchParams - A promise that resolves to an object with an optional `query` string used to determine search results.
 * @returns A React fragment with a hero section (heading, subheading, SearchForm) and a results section that shows either `Search results for "<query>"` or `All Startups`, and a list of `StartupCard` items when posts exist or a "No startups" message when none are available.
 */
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  const posts = [
    {
      _createdAt: new Date(),
      views: 55,
      author: { _id: 1, name: "Ibrahim" },
      _id: 1,
      description: "This is a description",
      image: "https://images.pexels.com/photos/140945/pexels-photo-140945.jpeg",
      category: "Robots",
      title: "We Robots",
    },
  ];
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
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts.length > 0 ? (
            posts.map((post: StartupCardType, index: number) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-results">No startups</p>
          )}
        </ul>
      </section>
    </>
  );
}