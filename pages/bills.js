import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Bills = ({ initialBills }) => {
  const [bills, setBills] = useState(initialBills);
  const [searchQuery, setSearchQuery] = useState('');
  const [legislativeBody, setLegislativeBody] = useState('');
  const [billStatus, setBillStatus] = useState('');
  const [sortBy, setSortBy] = useState('');

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Filter bills based on search query
    const filteredBills = initialBills.filter((bill) =>
      bill.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setBills(filteredBills);
  };

  const handleFilter = () => {
    // Apply filters for legislative body and status
    let filteredBills = initialBills;

    if (legislativeBody) {
      filteredBills = filteredBills.filter(
        (bill) => bill.legislative_body === legislativeBody
      );
    }

    if (billStatus) {
      filteredBills = filteredBills.filter((bill) => bill.status === billStatus);
    }

    setBills(filteredBills);
  };

  const handleSort = () => {
    // Sort bills based on selected criteria
    const sortedBills = [...bills].sort((a, b) => {
      if (sortBy === 'Alphabetical') {
        return a.title.localeCompare(b.title);
      }
      if (sortBy === 'Most Recent') {
        return new Date(b.created_at) - new Date(a.created_at);
      }
      return 0;
    });
    setBills(sortedBills);
  };

  useEffect(() => {
    handleFilter();
  }, [legislativeBody, billStatus]);

  useEffect(() => {
    handleSort();
  }, [sortBy]);

  return (
    <div className="container my-5">
      <h1 className="text-center">Explore Legislative Bills</h1>

      {/* Search Bar */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by bill title or description"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      {/* Filters and Sort */}
      <div className="d-flex justify-content-between mb-4">
        <select
          className="form-select me-2"
          value={legislativeBody}
          onChange={(e) => setLegislativeBody(e.target.value)}
        >
          <option value="">All Legislative Bodies</option>
          <option value="Texas Senate">Texas Senate</option>
          <option value="Texas House">Texas House</option>
        </select>

        <select
          className="form-select me-2"
          value={billStatus}
          onChange={(e) => setBillStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Passed">Passed</option>
        </select>

        <select
          className="form-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="Alphabetical">Alphabetical</option>
          <option value="Most Recent">Most Recent</option>
        </select>
      </div>

      {/* Bills List */}
      <div className="row">
        {bills.map((bill) => (
          <div className="col-md-4 mb-4" key={bill.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{bill.title}</h5>
                <p className="card-text">{bill.description}</p>
                <p className="mb-1">
                  <strong>Bill Number:</strong> {bill.bill_number}
                </p>
                <p className="mb-1">
                  <strong>Legislative Body:</strong> {bill.legislative_body}
                </p>
                <p className="mb-1">
                  <strong>Status:</strong> {bill.status || 'N/A'}
                </p>
                <p className="mb-1">
                  <strong>Supporting Politicians:</strong>{' '}
                  {bill.politicians.filter((p) => p.does_support).length}
                </p>
                <p>
                  <strong>Opposing Politicians:</strong>{' '}
                  {bill.politicians.filter((p) => !p.does_support).length}
                </p>
                <div className="d-flex justify-content-between">
                  <Link href={`/bill/${bill.id}`}>
                    <button className="btn btn-primary btn-sm">View Details</button>
                  </Link>
                  <Link href={`/draft/${bill.id}`}>
                    <button className="btn btn-secondary btn-sm">Draft Letter</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  // Replace with actual API call
  const bills = [
    {
      title: 'Transparency Act',
      description: 'A bill to increase government transparency.',
      bill_number: 'SB001',
      legislative_body: 'Texas Senate',
      status: null,
      id: 'bc303a66-2a72-4320-bbeb-698c7e24cb28',
      created_at: '2024-12-15T15:20:11.904539Z',
      politicians: [],
    },
    {
      title: 'Citizens Act',
      description: 'A bill to increase citizens privacy.',
      bill_number: 'SB002',
      legislative_body: 'Texas Senate',
      status: 'Active',
      id: '7a728fed-e997-488b-8c8b-bce859d8f546',
      created_at: '2024-12-15T18:13:20.596694Z',
      politicians: [
        { politician_id: '9452badd-5ff2-4aab-9bb8-9a56aec388b3', does_support: true },
        { politician_id: '10e7b75c-a729-4b21-bc2f-d4804d233b5b', does_support: false },
      ],
    },
  ];

  return {
    props: {
      initialBills: bills,
    },
  };
}

export default Bills;
