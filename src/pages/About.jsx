import React from "react";

const AboutPage = () => {
  return (
    <div id="about" className="container mx-auto p-8">
      <div className="text-gray-600 body-font w-full">
        <div className=" w-full p-1 hover:text-blue-900">
          <div className="border-2 border-teal-200 p-2 h-full rounded-2xl bg-stone-50 hover:bg-teal-400 shadow-inner ">
            <h1 className="md:text-3xl text-2xl font-medium title-font text-gray-900 title-font mb-2 text-center italic ">
              About PaperHub
            </h1>
            <p className="leading-relaxed p-4 md:p-8 lg:p-12 font-base md:font-medium text-center hover:text-stone-100 sm:text-xl text-base">
              At PaperHub, we believe in the power of collective learning. By
              sharing exam papers, students can elevate their academic journeys,
              gain valuable insights, and empower each other to achieve academic
              excellence. Whether you're preparing for exams or looking to
              contribute to the academic community, PaperHub is here to support
              you.
            </p>
            <p className="leading-relaxed p-4 md:p-8 lg:p-12 font-base md:font-medium text-center hover:text-stone-100 sm:text-xl text-base">
              Join us in catalyzing learning journeys, making education more
              accessible and collaborative. Together, let's build a community
              where knowledge knows no bounds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
