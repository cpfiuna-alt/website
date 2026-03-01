import React from "react";
import Layout from "@/components/layout/Layout";
import AdmissionHero from "@/components/admission/AdmissionHero";
import AdmissionInfo from "@/components/admission/AdmissionInfo";
import AdmissionForm from "@/components/admission/AdmissionForm";

const Admission = () => {
  return (
    <Layout>
      <AdmissionHero />
      
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar with admission information */}
            <div className="lg:col-span-1">
              <AdmissionInfo />
            </div>
            
            {/* Main admission form */}
            <div className="lg:col-span-2">
              <AdmissionForm />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Admission;
