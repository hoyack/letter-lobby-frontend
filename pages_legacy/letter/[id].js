// pages/letter/[id].js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const LetterDetails = () => {
  const router = useRouter();
  const { id } = router.query; // Get the letter ID from the URL

  const [letter, setLetter] = useState(null);

  // Simulate fetching letter data
  useEffect(() => {
    if (id) {
      // Replace with API call
      const fetchLetter = async () => {
        const mockLetter = {
          id,
          title: 'Support Bill 1234',
          status: 'Draft',
          content: '<p>This is the content of the letter...</p>',
          createdAt: '2024-12-15',
        };
        setLetter(mockLetter);
      };
      fetchLetter();
    }
  }, [id]);

  const handleAction = (action) => {
    alert(`Action: ${action}`);
    // Implement action-specific logic here (e.g., API call)
  };

  if (!letter) return <div>Loading...</div>;

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">{letter.title}</h1>
      <div className="mb-3">
        <strong>Status:</strong> {letter.status}
      </div>
      <div className="mb-3">
        <strong>Created At:</strong> {letter.createdAt}
      </div>
      <div className="border p-3 mb-4" style={{ minHeight: '200px' }}>
        <div dangerouslySetInnerHTML={{ __html: letter.content }} />
      </div>
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-secondary me-2"
          onClick={() => handleAction('Print to PDF')}
        >
          Print to PDF
        </button>
        <button
          className="btn btn-warning me-2"
          onClick={() => handleAction('Pay')}
        >
          Pay
        </button>
        <button
          className="btn btn-primary me-2"
          onClick={() => handleAction('Mail')}
        >
          Mail
        </button>
        <button
          className="btn btn-success"
          onClick={() => handleAction('Add to Queue')}
        >
          Add to Queue
        </button>
      </div>
    </div>
  );
};

export default LetterDetails;
