import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "@/layouts/RootLayout";
import Home from "@/pages/Home";
import Marketplace from "@/pages/Marketplace";
import ListingDetails from "@/pages/Listing";
import EscrowProcess from "@/pages/EscrowProcess/EscrowProcess";
import EscrowWizard from "@/pages/EscrowWizard/EscrowWizard";
import HowItWorks from "@/pages/HowItWorks";
import AntiFraud from "@/pages/AntiFraud";
import Blog from "@/pages/Blog/Blog";
import Gallery from "@/pages/Gallery/Gallery";
import Signup from "@/pages/Signup";
import Login from "@/pages/Login";
import ContactUs from "@/pages/ContactUs";
import TermsConditions from "@/pages/TermsAndCondition";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import PrivacyPolicy from "@/pages/PrivacyPolicy/PrivacyPolicy";
import Safehouse from "@/pages/SafeHouse";
import BlogDetails from "@/pages/Blog/BlogDetails/BlogDetails";
import Dashboard from "@/pages/Dashboard";
import CreateListing from "@/pages/Dashboard/CreateListing";
import ListingsPage from "@/pages/Dashboard/Listings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "marketplace",
        element: <Marketplace />,
      },
      {
        path: "listing/:id",
        element: <ListingDetails />,
      },
      {
        path: "escrow/:id",
        element: <EscrowProcess />,
      },
      {
        path: "create-escrow",
        element: <EscrowWizard />,
      },
      {
        path: "how-it-works",
        element: <HowItWorks />,
      },
      {
        path: "safehouse",
        element: <Safehouse />,
      },
      {
        path: "antifraud",
        element: <AntiFraud />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "blog/:id",
        element: <BlogDetails />,
      },
      {
        path: "gallery",
        element: <Gallery />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "contact",
        element: <ContactUs />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "terms-and-condition",
        element: <TermsConditions />,
      },

      {
        path: "dashboard",
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "sell",
            element: <CreateListing />,
          },
          {
            path: "listings",
            element: <ListingsPage />,
          },
        ],
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
