import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Spinner, Modal } from "react-bootstrap";
import MenuBar from "../../components/MenuBar";  
// Define interface for payment object
import config from '../../static/config.json';
import useTitle from "../../hooks/useTitle";
import { paymentAetailAll, updatePaymentStatus} from "../../api/payment";

interface Payment {
  id: number;
  user_id: string;
  amount: number;
  description: string;
  doc?: string;
  status: string;
  create_at: string;
  update_at: string;
}

const PaymentListPage: React.FC = () => {
  useTitle('Payment List')

  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [token, setToken] = useState<string>("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedPaymentId, setSelectedPaymentId] = useState<number>(0);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [change] = useState<string>("");


  useEffect(() => { 
    let storedToken = localStorage.getItem("token");
    console.log("storedToken", storedToken);
    if (storedToken) { 
      fetchPayments();
    }
  },[change]);

  const fetchPayments = async () => {
    setIsLoading(true);
    try {
      // const response = await fetch(
      //   `${config.NEXT_PUBLIC_API_BASE_URL}/api/payment-detail-all`,
      //   {
      //     headers: { 
      //     "authorization": localStorage.getItem("token") ?? ''
      //     },
      //   }
      // ); 
      // if (response.ok) {
        const data = await paymentAetailAll();
        setPayments(data.data); 
    } catch (error) {
      console.error("Error fetching payment list:", error);
      toast.error(String(error)  );
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async () => {
    try {
      setIsLoading(true); 
      let response = await updatePaymentStatus(selectedPaymentId,selectedStatus);
      if (response.success) {
        toast.success("Payment status updated successfully");
        fetchPayments(); // Refresh the payment list
        setShowConfirmation(false);
      } else {
        throw new Error("Failed to update payment status");
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
      toast.error("Failed to update payment status");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>   
      <div className="container  bg-dark text-white">
        <h1 className="my-4">Payment List</h1>
        {isLoading ? (
          <Spinner animation="border" role="status" variant="light">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-dark">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User ID</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Uploaded Document</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id}>
                    <td>{payment.id}</td>
                    <td>{payment.user_id}</td>
                    <td>{payment.amount}</td>
                    <td>{payment.description}</td>
                    <td>
                      {payment.doc ? (
                        <a
                          href={`${config.NEXT_PUBLIC_API_BASE_URL}/uploads/${payment.doc}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          doc
                        </a>
                      ) : (
                        "No document uploaded"
                      )}
                    </td>
                    <td>{payment.status}</td>
                    <td>{new Date(payment.create_at).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</td>
                    <td>{ !payment.update_at ? '-':  new Date(payment.update_at).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })}</td>
                    {/* <td>{format(String(payment.update_at), 'MMMM dd, yyyy')}</td> */}
                    <td>
                      {payment.status === "pending" && (
                        <>
                          <Button
                            variant="success"
                            onClick={() => {
                              setSelectedPaymentId(payment.id);
                              setSelectedStatus("approved");
                              setShowConfirmation(true);
                            }}
                            disabled={isLoading}
                          >
                            Approve
                          </Button>{" "}
                          <Button
                            variant="danger"
                            onClick={() => {
                              setSelectedPaymentId(payment.id);
                              setSelectedStatus("rejected");
                              setShowConfirmation(true);
                            }}
                            disabled={isLoading}
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Action</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to update the payment status?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleUpdateStatus}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Confirm"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div> 
    <ToastContainer/>

    </>
  );
};
 
export default PaymentListPage;

