
import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AITrainer from "@/components/admin/AITrainer";

const AITrainerPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>AI Training Interface - PixelForge</title>
        <meta name="description" content="Train and customize the PixelForge AI assistant" />
      </Helmet>

      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <div className="container mx-auto py-8">
            <AITrainer />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default AITrainerPage;
