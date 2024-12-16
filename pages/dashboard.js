import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const router = useRouter();

  // Sample letters data (replace with API call later)
  const letters = [
    { id: 1, title: 'Support Bill 1234', status: 'Draft' },
    { id: 2, title: 'Oppose Bill 5678', status: 'Paid' },
    { id: 3, title: 'Letter to Senator A', status: 'Mailed' },
  ];

  const markAsMailed = (id) => {
    // Replace with API call to mark letter as mailed
    console.log(`Marking letter ${id} as mailed`);
    router.push(`/mailed/${id}`);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Dashboard</h1>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {letters.map((letter, index) => (
              <tr key={letter.id}>
                <td>{index + 1}</td>
                <td>{letter.title}</td>
                <td>
                  <span
                    className={`badge ${
                      letter.status === 'Draft'
                        ? 'bg-warning text-dark'
                        : letter.status === 'Paid'
                        ? 'bg-primary'
                        : 'bg-success'
                    }`}
                  >
                    {letter.status}
                  </span>
                </td>
                <td>
                  <Link href={`/letter/${letter.id}`}>
                    <button className="btn btn-sm btn-info me-2">View</button>
                  </Link>
                  <Link href={`/draft/${letter.id}`}>
                    <button className="btn btn-sm btn-secondary me-2">Edit</button>
                  </Link>
                  {letter.status !== 'Mailed' && (
                    <button
                      className="btn btn-sm btn-success"
                      onClick={() => markAsMailed(letter.id)}
                    >
                      Mark as Mailed
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
