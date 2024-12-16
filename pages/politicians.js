import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Politicians = ({ initialPoliticians }) => {
  // Initialize state with server-provided data (immutable)
  const [politicians, setPoliticians] = useState(() => initialPoliticians || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [legislativeBodyFilter, setLegislativeBodyFilter] = useState('');
  const [sortBy, setSortBy] = useState('');

  const handleSearch = () => {
    const filtered = initialPoliticians.filter((politician) =>
      `${politician.name} ${politician.title} ${politician.office_city} ${politician.office_state}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    setPoliticians(filtered);
  };

  const handleFilter = () => {
    let filtered = initialPoliticians;

    if (stateFilter) {
      filtered = filtered.filter((politician) => politician.office_state === stateFilter);
    }

    if (legislativeBodyFilter) {
      filtered = filtered.filter((politician) => politician.legislative_body === legislativeBodyFilter);
    }

    setPoliticians(filtered);
  };

  const handleSort = () => {
    const sorted = [...politicians].sort((a, b) => {
      if (sortBy === 'Alphabetical') return a.name.localeCompare(b.name);
      if (sortBy === 'Most Active') return b.bills.length - a.bills.length;
      return 0;
    });
    setPoliticians(sorted);
  };

  useEffect(() => {
    handleFilter();
  }, [stateFilter, legislativeBodyFilter]);

  useEffect(() => {
    handleSort();
  }, [sortBy]);

  useEffect(() => {
    console.log('SSR Hydration:', politicians);
  }, []);

  return (
    <div className="container my-5">
      <h1 className="text-center">Explore Politicians and Their Stances on Bills</h1>

      {/* Search */}
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search by name, title, or location"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
      />

      {/* Filters */}
      <div className="d-flex mb-3">
        <select className="form-select me-2" value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}>
          <option value="">All States</option>
          <option value="TX">Texas</option>
        </select>
        <select
          className="form-select me-2"
          value={legislativeBodyFilter}
          onChange={(e) => setLegislativeBodyFilter(e.target.value)}
        >
          <option value="">All Legislative Bodies</option>
          <option value="Texas Senate">Texas Senate</option>
        </select>
        <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort by</option>
          <option value="Alphabetical">Alphabetical</option>
          <option value="Most Active">Most Active</option>
        </select>
      </div>

      {/* Politicians List */}
      <div className="row">
        {politicians.map((politician) => (
          <div key={politician.id} className="col-md-4">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{politician.name}</h5>
                <p className="card-text">
                  <strong>Title:</strong> {politician.title}
                </p>
                <p className="card-text">
                  <strong>Office:</strong> {politician.office_address_line1}, {politician.office_city},{' '}
                  {politician.office_state} {politician.office_zip}
                </p>
                <p className="card-text">
                  <strong>Legislative Body:</strong> {politician.legislative_body}
                </p>
                <ul>
                  {politician.bills.map((bill) => (
                    <li key={bill.bill_id}>
                      Bill ID: {bill.bill_id} ({bill.does_support ? 'Supports' : 'Opposes'})
                    </li>
                  ))}
                </ul>
                <Link href={`/politician/${politician.id}`}>
                  <button className="btn btn-primary btn-sm">View Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  // Static data for debugging
  const politicians = [
    {
      name: 'Jane Doe',
      title: 'Senator',
      office_address_line1: '100 Main St',
      office_city: 'Austin',
      office_state: 'TX',
      office_zip: '78701',
      legislative_body: 'Texas Senate',
      id: '1',
      bills: [{ bill_id: 'b1', does_support: true }],
    },
  ];
  return { props: { initialPoliticians: politicians } };
}

export default Politicians;
