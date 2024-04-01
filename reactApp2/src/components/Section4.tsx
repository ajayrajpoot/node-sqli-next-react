 
import React, { useState } from 'react'; 
import {  toast } from "react-toastify";
import config from '../static/config.json';
import { paymentDetail, addPaymentConfirmation } from "../api/payment";

const Section4: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [doc, setDoc] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check if all fields are filled
    if (!username || !email || !doc || !amount ) {
      toast.error('All fields are mandatory!');
      return;
    }

    // Set submitting state to true
    setSubmitting(true);

    try {
      // Create form data object
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('doc', doc);
      formData.append('amount', String( amount));
      formData.append('description', description);

      // Perform the form submission
      const response = await addPaymentConfirmation(formData)
      //  await fetch(`${config.NEXT_PUBLIC_API_BASE_URL}/api/payment-confirmation`, {
      //   method: 'POST',
      //   body: formData,
      // });

      console.log("response", response)
 
      // Check if the request was successful
      if (response.success) {
        toast.success('Payment confirmation submitted successfully!');
        // Reset form fields after successful submission
        setUsername(''); 
        setEmail('');
        setAmount('');
        setDescription('')
        setDoc(null);

        if (typeof document !== 'undefined') {
          const fileInput = document.getElementById('upload') as HTMLInputElement;
          if (fileInput) {
            fileInput.value = ''
            // setDoc(null);
          }
        }
      } else {
        toast.error('Failed to submit payment confirmation.');
      }
    } catch (error) {
      console.error('Error submitting payment confirmation:', error);
      toast.error('An error occurred while submitting payment confirmation.');
    } finally {
      // Set submitting state back to false
      setSubmitting(false);
    }
  };

  return (
    <section id='pstatus' className="home_s4 bg-dark py-5 bt">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 my-3">
            <form onSubmit={handleSubmit}>              
              <div className="mb-3">
                <label htmlFor="userid" className="form-label text-white">User Id</label>
                <input type="text" className="form-control" id="userid" value={username} onChange={(e) => setUsername(e.target.value)} aria-describedby="User Id" required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label text-white">Email</label>
                <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-describedby="Email" required />
              </div>
              <div className="mb-3">
                <label htmlFor="amount" className="form-label text-white">Amount</label>
                <input type="number" className="form-control" id="amount" value={amount} onChange={(e) => setAmount((e.target.value))} aria-describedby="Amount" required />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label text-white">Description</label>
                <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} aria-describedby="Description"></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="upload" className="form-label text-white">Upload File</label>
                <input type="file" className="form-control" id="upload" onChange={(e) => setDoc(e.target.files?.[0] || null)} aria-describedby="Upload file" accept="image/png, image/jpeg, application/pdf" required />
                 
              </div>
              <button type="submit" className="btn btn-warning" disabled={submitting}>Submit</button>
            </form>
          </div>
          <div className="col-md-6 my-3">
            <img src="/assets/img/Sign up-cuate.svg" className="img-fluid" alt="Sign up"   width={500} height={300}  />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section4;
