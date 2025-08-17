
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import News from "@/components/home/News";
import AboutClub from "@/components/home/AboutClub";
import SocialMedia from "@/components/home/SocialMedia";
import BlogNewsletter from "@/components/blog/BlogNewsletter";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <Layout>
      <Hero />
      <div className={isMobile ? "space-y-8" : "space-y-16"}>
        <News />
        <AboutClub />
        <Features />
        {/*<SocialMedia />*/}
      </div>
      <BlogNewsletter />
    </Layout>
  );
};

export default Index;
