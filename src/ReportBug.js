import React, { useState } from 'react';
import './ReportBug.css';


function ReportBug() {
    console.log("Renderizando ReportBug");
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('Aberto');
    const [priority, setPriority] = useState('Normal');
    const [category, setCategory] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const bugData = {
            title,
            description,
            status,
            priority,
            category_id: category,
        };
        try {
            const response = await fetch('/api/reportBug', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bugData)
            });
            const data = await response.json();
            if (data.success) {
                alert('Bug reportado com sucesso!');
            } else {
                alert('Erro ao reportar bug!');
            }
        } catch (error) {
            console.error("Erro ao enviar bug:", error);
        }
    };

    return (
        <div className="report-bug-container"> 
            <h1>Reportar Bug</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Título:
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} required />
                </label>
                <label>
                    Descrição:
                    <textarea value={description} onChange={e => setDescription(e.target.value)} required />
                </label>
                <label>
                    Status:
                    <select value={status} onChange={e => setStatus(e.target.value)}>
                        <option value="Aberto">Aberto</option>
                        <option value="Em análise">Em análise</option>
                        <option value="Resolvido">Resolvido</option>
                        <option value="Fechado">Fechado</option>
                    </select>
                </label>
                <label>
                    Prioridade:
                    <select value={priority} onChange={e => setPriority(e.target.value)}>
                        <option value="Baixa">Baixa</option>
                        <option value="Normal">Normal</option>
                        <option value="Alta">Alta</option>
                    </select>
                </label>
                <label>
                    Categoria:
                    <select value={category} onChange={e => setCategory(e.target.value)}>
                        <option value="1">Front-end</option>
                        <option value="2">Back-end</option>
                        <option value="3">Banco de Dados</option>
                    </select>
                </label>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}

export default ReportBug;
