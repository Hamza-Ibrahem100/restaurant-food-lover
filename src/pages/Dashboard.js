import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { db } from '../firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';

function Dashboard() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRes, setSelectedRes] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const q = query(collection(db, 'reservations'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setReservations(data);
    } catch (error) {
      console.error('Error fetching:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (id, newStatus) => {
    try {
      await updateDoc(doc(db, 'reservations', id), { status: newStatus });
      fetchReservations();
    } catch (error) {
      console.error('Error updating:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this reservation?')) {
      try {
        await deleteDoc(doc(db, 'reservations', id));
        fetchReservations();
      } catch (error) {
        console.error('Error deleting:', error);
      }
    }
  };

  const handleReply = async () => {
    if (!replyMessage.trim()) return;
    alert(`Reply sent to ${selectedRes.email}: ${replyMessage}`);
    setReplyMessage('');
    setSelectedRes(null);
  };

  return (
    <>
      <Nav />
      
      <section className="dashboard">
        <div className="container">
          <h1 className="section-title">Reservation Dashboard</h1>
          
          {loading ? (
            <p className="loading-text">Loading reservations...</p>
          ) : reservations.length === 0 ? (
            <p className="empty-text">No reservations yet.</p>
          ) : (
            <table className="reservation-table">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((res) => (
                  <tr key={res.id}>
                    <td className="customer-name">{res.name}</td>
                    <td>{res.date}</td>
                    <td>{res.time}</td>
                    <td>
                      <span className={`status status-${res.status || 'pending'}`}>
                        {res.status || 'Pending'}
                      </span>
                    </td>
                    <td className="actions">
                      <button onClick={() => handleStatus(res.id, 'confirmed')} title="Confirm">✓</button>
                      <button onClick={() => handleStatus(res.id, 'cancelled')} title="Cancel">✗</button>
                      <button onClick={() => setSelectedRes(res)} title="Reply">✉</button>
                      <button onClick={() => handleDelete(res.id)} title="Delete">🗑</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {selectedRes && (
        <div className="modal-overlay" onClick={() => setSelectedRes(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Reply to {selectedRes.name}</h2>
            <p>Email: {selectedRes.email}</p>
            <textarea
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder="Type your reply..."
              rows={4}
            />
            <div className="modal-buttons">
              <button className="modal-btn cancel" onClick={() => setSelectedRes(null)}>Cancel</button>
              <button className="modal-btn confirm" onClick={handleReply}>Send Reply</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Dashboard;