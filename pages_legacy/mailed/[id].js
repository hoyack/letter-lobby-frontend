import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const LetterMailed = () => {
  const router = useRouter();
  const { id } = router.query;

  const [response, setResponse] = useState(null);

  // Simulate fetching letter details
  useEffect(() => {
    if (id) {
      // Replace this with your actual API call
      const fetchMailedLetter = async () => {
        const mockResponse = {
          message: "Letter mailed successfully",
          mailing_transaction_id: "d503ee98-cd25-448e-892b-7592d3184a23",
          mail_service_response: {
            id: "ltr_1d2eb916300fbc61",
            description: "Legislative letter",
            to: {
              name: "JANE DOE",
              address_line1: "100 MAIN ST",
              address_city: "AUSTIN",
              address_state: "TX",
              address_zip: "78701",
            },
            from: {
              name: "LETTER LOBBY",
              address_line1: "123 MAIN ST",
              address_line2: "SUITE 1",
              address_city: "AUSTIN",
              address_state: "TX",
              address_zip: "78205",
            },
            url: "https://lob-assets.com/letters/ltr_1d2eb916300fbc61.pdf?version=v1&expires=1736970831&signature=pAclcxMEY9c1zliYd-AjM3nd_n-ZHJnyiH-5_M2f8GZT5iAqRhcLAQcK5FzxoXdSlZ3K2HgJdoOyMDZIG5g1Ag",
            mail_type: "usps_first_class",
            status: "processed",
            expected_delivery_date: "2024-12-24",
          },
        };
        setResponse(mockResponse);
      };
      fetchMailedLetter();
    }
  }, [id]);

  if (!response) return <div>Loading...</div>;

  const { mail_service_response } = response;

  return (
    <div className="container my-5">
      <h1 className="text-center text-success mb-4">Letter Mailed Successfully!</h1>
      <div className="mb-3">
        <strong>Description:</strong> {mail_service_response.description}
      </div>
      <div className="mb-3">
        <strong>Recipient:</strong> {mail_service_response.to.name}, {mail_service_response.to.address_line1},{' '}
        {mail_service_response.to.address_city}, {mail_service_response.to.address_state}{' '}
        {mail_service_response.to.address_zip}
      </div>
      <div className="mb-3">
        <strong>Sender:</strong> {mail_service_response.from.name}, {mail_service_response.from.address_line1}{' '}
        {mail_service_response.from.address_line2}, {mail_service_response.from.address_city},{' '}
        {mail_service_response.from.address_state} {mail_service_response.from.address_zip}
      </div>
      <div className="mb-3">
        <strong>Mail Type:</strong> {mail_service_response.mail_type}
      </div>
      <div className="mb-3">
        <strong>Status:</strong> {mail_service_response.status}
      </div>
      <div className="mb-3">
        <strong>Expected Delivery Date:</strong> {mail_service_response.expected_delivery_date}
      </div>

      {/* Embed PDF */}
      <div className="text-center my-4">
        <h4>Letter Preview</h4>
        <iframe
          src={mail_service_response.url}
          style={{ width: '100%', height: '600px', border: '1px solid #ccc' }}
          title="Letter Preview"
        ></iframe>
      </div>

      <div className="text-center mt-4">
        <Link href="/dashboard">
          <button className="btn btn-primary me-3">Return to Dashboard</button>
        </Link>
        <a href={mail_service_response.url} target="_blank" rel="noopener noreferrer">
          <button className="btn btn-secondary">Download PDF</button>
        </a>
      </div>
    </div>
  );
};

export default LetterMailed;
