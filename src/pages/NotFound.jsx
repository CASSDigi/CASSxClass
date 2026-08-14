import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container-x py-32 text-center">
      <span className="font-display text-7xl text-gold italic">x</span>
      <h1 className="font-display text-3xl mt-4">Page Not Found</h1>
      <p className="text-charcoal/60 mt-3 text-sm">
        The page you're looking for doesn't exist or has moved.
      </p>
      <Link to="/" className="btn-primary inline-flex mt-8">
        Back to Home
      </Link>
    </div>
  );
}
