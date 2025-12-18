/**
 * Renders the homepage hero section promoting startup pitches and connections.
 *
 * @returns The React element containing a pink hero section with a multi-line heading ("Pitch Your Startup, Connect With Entrepreneurs") and a short descriptive paragraph encouraging idea submission, voting, and visibility.
 */
export default function Home() {
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
      </section>
    </>
  );
}