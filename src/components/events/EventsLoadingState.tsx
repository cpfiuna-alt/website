
import React from 'react';
import Layout from "@/components/layout/Layout";

const EventsLoadingState = () => {
  return (
    <Layout>
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Eventos</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="glass-card animate-pulse">
                  <div className="h-48 bg-muted/50 rounded-t-xl"></div>
                  <div className="p-6">
                    <div className="h-6 bg-muted/50 rounded mb-3 w-3/4"></div>
                    <div className="h-4 bg-muted/50 rounded mb-4 w-full"></div>
                    <div className="space-y-2 mb-4">
                      <div className="h-3 bg-muted/50 rounded w-1/2"></div>
                      <div className="h-3 bg-muted/50 rounded w-1/3"></div>
                      <div className="h-3 bg-muted/50 rounded w-2/3"></div>
                    </div>
                    <div className="h-8 bg-muted/50 rounded-full w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EventsLoadingState;
