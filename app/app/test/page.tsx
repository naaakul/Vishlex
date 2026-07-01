import Navbar from "@/components/Navbar";

const sections = ["Hero"];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Background gradients */}
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-0 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[180px]" />
          <div className="absolute bottom-0 left-20 h-[500px] w-[500px] rounded-full bg-purple-500/20 blur-[180px]" />
          <div className="absolute right-20 top-40 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[180px]" />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,black_80%)]" />
        </div>

        <div className="font-instrument relative z-10 mx-auto max-w-5xl px-6 text-center">
          <p className="mb-6 text-sm uppercase tracking-[0.4em] text-white/50">
            Liquid Glass Experiment
          </p>

          <h1 className="text-7xl leading-none tracking-tight">
            Cardboard.ai
            <br />
            Glass Navbar
          </h1>

          <h1 className="font-instrument text-6xl">Vishlex</h1>


          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/60">
            Scroll this page and watch how the navbar interacts with the
            colorful blurred background behind it.
          </p>
        </div>
      </section>

      {/* Test Sections */}
      {sections.map((section, i) => (
        <section
          key={section}
          className="relative flex min-h-screen items-center justify-center overflow-hidden border-t border-white/5"
        >
          <div
            className={`absolute ${
              i % 2 === 0 ? "left-10 top-20" : "right-10 bottom-20"
            } h-[450px] w-[450px] rounded-full `}
          />

          <div className="relative z-10 mx-auto max-w-4xl px-6">
            <h2 className="mb-8 text-6xl font-bold">{section}</h2>

            <p className="text-lg leading-8 text-white/60">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatem fugiat quas praesentium expedita, repellendus
              asperiores exercitationem labore dolores suscipit magni omnis
              ducimus doloremque architecto quidem rem quos. Molestiae,
              inventore laboriosam.
            </p>

            <div className="mt-12 grid grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((card) => (
                <div
                  key={card}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md"
                >
                  <div className="mb-4 h-40 rounded-2xl bg-gradient-to-br from-white/20 to-transparent" />

                  <h3 className="text-xl font-semibold">Card {card}</h3>

                  <p className="mt-3 text-white/60">
                    Testing the glass distortion while scrolling over different
                    backgrounds.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
