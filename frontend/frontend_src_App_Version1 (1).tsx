import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Ticket = {
  id: number;
  title: string;
  description: string;
  status: string;
  createdAt: string;
};

export default function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    axios.get('/api/tickets').then((r) => setTickets(r.data));
  }, []);

  const create = async () => {
    await axios.post('/api/tickets', { title, description });
    const r = await axios.get('/api/tickets');
    setTickets(r.data);
    setTitle('');
    setDescription('');
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>IT Helpdesk — MVP</h1>

      <section style={{ marginBottom: 24 }}>
        <h2>Create Ticket</h2>
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <br />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <br />
        <button onClick={create}>Create</button>
      </section>

      <section>
        <h2>Tickets</h2>
        {tickets.length === 0 && <div>No tickets yet</div>}
        <ul>
          {tickets.map((t) => (
            <li key={t.id}>
              <strong>{t.title}</strong> — {t.status} <br />
              <small>{t.description}</small>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}