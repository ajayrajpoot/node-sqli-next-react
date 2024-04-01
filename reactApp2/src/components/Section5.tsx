'use client'

import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Spinner } from "react-bootstrap";
import config from '../static/config.json';

// Define interface for payment object
interface Payment {
  id: number;
  username: string;
  email: string;
  amount: number;
  description: string;
  doc?: string;
  status: string;
  create_at: string;
  update_at: string;
}

const Section5: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSearch = async () => {
    // Check if both username and email are entered
    if (username && email) {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${config.NEXT_PUBLIC_API_BASE_URL}/api/payment-detail`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email }),
          }
        );
        if (response.ok) {
          const data = await response.json();
          setPayments(data.data);
        } else {
          throw new Error("Failed to fetch payment list");
        }
      } catch (error) {
        console.error("Error fetching payment list:", error);
        toast.error("Failed to fetch payment list");
      } finally {
        setIsLoading(false);
      }
    } else {
      toast.error("Please enter both username and email");
    }
  };

  useEffect(() => {
    // Fetch payments when the component mounts
    // handleSearch();
  }, []);

  return (
    <section id="sStatus" className="home_s5 bg-dark py-5 bt">
      <div className="container">
        <div className="row">
          <div className="col-12 border p-3 rounded-3">
            <div className="d-flex justify-content-between align-items-center status">
              <h4 className="mb-0 text-white">Status</h4>
              <div className="d-flex">
                <div className="mx-1">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    aria-describedby="Username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mx-1">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    aria-describedby="Email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="d-flex align-items-center mx-1">
                  <Button className="btn btn-warning" onClick={handleSearch}>
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 mt-4 px-0">
            {isLoading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : payments.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">User ID</th>
                      <th scope="col">Email</th>
                      <th scope="col">Created At</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((payment) => (
                      <tr key={payment.id}>
                        <td>{payment.username}</td>
                        <td>{payment.email}</td>
                        <td>{payment.create_at}</td>
                        <td>
                          {payment.status === "approved" && (
                            <button className="btn btn-sm btn-success">
                              success
                            </button>
                          )}
                          {payment.status === "pending" && (
                            <button className="btn btn-sm btn-warning">
                              pending
                            </button>
                          )}
                          {payment.status === "rejected" && (
                            <button className="btn btn-sm btn-danger">
                              Failed
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div>No payments found</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section5;
