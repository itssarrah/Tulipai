import React from "react";
import NavBar from "../Components/NavBar";
// import "./LandingPage.css"; // Optional: Add custom CSS for styling the landing page.

function LandingPage() {
  return (
    <>
      <NavBar />
      <div className="landing-page mt-4">
        <header className="landing-header flex items-center justify-between md:h-[80vh] flex-col-reverse md:flex-row">
          <div className="right flex flex-col items-start space-y-4  pt-10 md:pt-0 px-2 md:pl-8">
            <h1 className="text-3xl md:text-6xl font-bold mb-4 text-dark-blue">
              Revolutionize Your Corporate Financial Health
            </h1>

            <p className="text-md md:text-lg mb-8 text-medium-blue">
              Empower your organization with real-time financial insights,
              efficient expense tracking, and automated reporting to drive
              strategic growth and operational efficiency.
            </p>

            <a
              href="/signup"
              className="px-6 py-3 bg-dark-blue text-white rounded-lg hover:bg-medium-blue transition duration-300"
            >
              Get Started
            </a>
          </div>
          <div className="left w-[100vw] md:w-[60vw] ">
            <img
              src="/left_landing2.png"
              alt="left_landing"
              className="object-cover "
            />
          </div>
        </header>
      </div>
    </>
  );
}

export default LandingPage;
