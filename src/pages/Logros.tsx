
import React from "react";
import Layout from "@/components/layout/Layout";
import LogrosHero from "@/components/logros/LogrosHero";
import LogrosGrid from "@/components/logros/LogrosGrid";
import LogrosStats from "@/components/logros/LogrosStats";
import LogrosCallToAction from "@/components/logros/LogrosCallToAction";
import Stats from "@/components/about/Stats";

const Logros = () => {
  return (
    <Layout>
      <LogrosHero />
      <LogrosStats />
      <LogrosGrid />
      <LogrosCallToAction />
    </Layout>
  );
};

export default Logros;
