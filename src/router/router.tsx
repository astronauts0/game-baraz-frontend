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
import OrdersPage from "@/pages/Dashboard/Orders";
import OrderDetailsPage from "@/pages/Dashboard/Orders/Order";
import ChatPage from "@/pages/Dashboard/Chat";
import WalletPage from "@/pages/Dashboard/Wallet";
import SellerToolsPage from "@/pages/Dashboard/SellerTool";
import CreateDispute from "@/pages/Dashboard/Disputes/CreateDispute";
import DisputesPage from "@/pages/Dashboard/Disputes";
import HelpCenterPage from "@/pages/Dashboard/Help";
import ProfilePage from "@/pages/Dashboard/Profile";

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
            children: [
              {
                index: true,
                element: <CreateListing />,
              },
              {
                path: ":mode/:id",
                element: <CreateListing />,
              },
            ],
          },
          {
            path: "listings",
            element: <ListingsPage />,
          },
          {
            path: "orders",
            children: [
              {
                index: true,
                element: <OrdersPage />,
              },
              {
                path: ":id",
                element: <OrderDetailsPage />,
              },
              {
                path: ":id/chat",
                element: <ChatPage />,
              },
            ],
          },
          {
            path: "wallet",
            element: <WalletPage />,
          },
          {
            path: "dispute/create",
            element: <CreateDispute />,
          },
          {
            path: "disputes",
            element: <DisputesPage />,
          },
          {
            path: "tools",
            element: <SellerToolsPage />,
          },
          {
            path: "help",
            element: <HelpCenterPage />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
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
