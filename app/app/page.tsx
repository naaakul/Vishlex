import getServerSession from "@/utils/getServerSession";
import FeatureSection from "@/components/feature-section";
import Navbar from "@/components/Navbar";
import CreativeUtilities from "@/components/CreativeUtilities";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import MarqueeSection from "@/components/Marquee-section";


export default async function Home() {
  const session = await getServerSession();

  return (
    <main className="text-white flex flex-col gap-24">
      <Navbar session={session}/>
      <Hero session={session} />
      <FeatureSection />
      <MarqueeSection/>
      <CreativeUtilities />
      <Footer />
    </main>
  );
}
