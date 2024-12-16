import React, { useState } from 'react';
import Link from 'next/link';

const Queue = () => {
  // Sample queued letters data (replace with API call later)
  const [queue, setQueue] = useState([
    { id: 101, title: 'Support Bill 9876', status: 'Queued' },
    { id: 102, title: 'Oppose Bill 6543', status: 'Queued' },
    { id: 103, title: 'Letter to Governor B', status: 'Queued' },
  ]);

  const removeFromQueue = (id) => {
    setQueue((prevQueue) => prevQueue.filter((letter) => letter.id !== id));
    console.log(`Removed letter ${id} from queue`); // Replace with API call
  };

  const processQueue = () => {
    console.log('Processing queue...'); // Replace with batch processing API call
    alert('Queue processed successfully!');
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Queue Management</h1>
      {queue.length === 0 ? (
        <div className="text-center">
          <p>No letters in the queue.</p>
          <Link href="/dashboard">
            <button className="btn btn-primary">Go to Dashboard</button>
          </Link>
        </div>
      ) : (
        <>
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
                {queue.map((letter, index) => (
                  <tr key={letter.id}>
                    <td>{index + 1}</td>
                    <td>{letter.title}</td>
                    <td>
                      <span className="badge bg-info text-dark">{letter.status}</span>
                    </td>
                    <td>
                      <Link href={`/letter/${letter.id}`}>
                        <button className="btn btn-sm btn-info me-2">View</button>
                      </Link>
                      <Link href={`/draft/${letter.id}`}>
                        <button className="btn btn-sm btn-secondary me-2">Edit</button>
                      </Link>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => removeFromQueue(letter.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-4">
            <button className="btn btn-success" onClick={processQueue}>
              Process Queue
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Queue;
