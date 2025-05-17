'use client';
import { useEffect, useState } from 'react';

export default function Page() {
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ name: '', email: '', id: null });
    const [message, setMessage] = useState<string | null>(null);

    const fetchUsers = async () => {
        const res = await fetch('/api/users');
        const data = await res.json();
        setUsers(data.data ? data.data : []);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSubmit = async () => {
        setMessage(null);
        let res, data;
        if (form.id) {
            res = await fetch(`/api/users/${form.id}`, {
                method: 'PATCH',
                body: JSON.stringify({ name: form.name, email: form.email }),
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            res = await fetch('/api/users', {
                method: 'POST',
                body: JSON.stringify({ name: form.name, email: form.email }),
                headers: { 'Content-Type': 'application/json' },
            });
        }
        data = await res.json();
        setMessage(data.message || 'Операцію виконано');
        setForm({ name: '', email: '', id: null });
        fetchUsers();
    };

    const handleDelete = async (id: number) => {
        setMessage(null);
        const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
        const data = await res.json();
        setMessage(data.message || 'Користувача видалено');
        fetchUsers();
    };

    const handleEdit = (user: any) => {
        setForm(user);
        setMessage(null);
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Користувачі</h1>
            {message && (
                <div className="bg-gray-100 text-black px-4 py-2 mb-3 rounded border">{message}</div>
            )}
            <input
                placeholder="Ім'я"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border p-2 mr-2 mb-2"
            />
            <input
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="border p-2 mr-2 mb-2"
            />
            <button
                onClick={handleSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                {form.id ? 'Оновити' : 'Створити'}
            </button>
            <ul className="mt-6">
                {users.map((u: any) => (
                    <li key={u.id} className="border-b py-2 flex justify-between items-center">
                        <div>
                            <strong>{u.name}</strong> — {u.email}
                        </div>
                        <div>
                            <button
                                onClick={() => handleEdit(u)}
                                className="text-yellow-600 hover:underline mr-4"
                            >
                                Редагувати
                            </button>
                            <button
                                onClick={() => handleDelete(u.id)}
                                className="text-red-600 hover:underline"
                            >
                                Видалити
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}