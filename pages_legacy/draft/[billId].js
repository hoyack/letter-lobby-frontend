import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

const Draft = () => {
  const router = useRouter();
  const { billId } = router.query;

  const [stance, setStance] = useState('');
  const [feedback, setFeedback] = useState('');
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Stance:', stance);
    console.log('Feedback:', feedback);
    console.log('Content:', editorState.getCurrentContent().getPlainText());
    alert('Letter Draft Saved!');
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Draft Letter for Bill {billId}</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="stance" className="form-label">Select Your Stance</label>
          <select
            id="stance"
            className="form-select"
            value={stance}
            onChange={(e) => setStance(e.target.value)}
            required
          >
            <option value="">-- Select Stance --</option>
            <option value="Support">Support</option>
            <option value="Oppose">Oppose</option>
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="feedback" className="form-label">Provide Feedback</label>
          <textarea
            id="feedback"
            className="form-control"
            rows="3"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Why do you support or oppose this bill?"
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="editor" className="form-label">Draft Your Letter</label>
          <div className="border p-2" style={{ minHeight: '150px' }}>
            <Editor
              editorState={editorState}
              onChange={setEditorState}
              placeholder="Write your letter here..."
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100">Save Draft</button>
      </form>
    </div>
  );
};

export default Draft;
