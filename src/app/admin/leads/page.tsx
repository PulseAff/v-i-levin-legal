'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Download, RefreshCw, Filter, Search } from 'lucide-react';
import { LeadRecord } from '@/lib/leadsStore';

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      if (data.success) {
        setLeads(data.leads || []);
      }
    } catch (e) {
      console.error('Failed to fetch leads', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const exportCSV = () => {
    if (!leads.length) return;
    const headers = ['ID', 'Date', 'Source', 'Category', 'Jurisdiction', 'Urgency', 'Client Name', 'Telegram', 'Status', 'Description'];
    const rows = leads.map((l) => [
      l.id,
      new Date(l.createdAt).toLocaleDateString('ru-RU'),
      `"${l.source || ''}"`,
      `"${l.serviceCategory || ''}"`,
      `"${l.jurisdiction || ''}"`,
      `"${l.urgency || ''}"`,
      `"${l.contact?.name || ''}"`,
      `"${l.contact?.telegramUsername || ''}"`,
      `"${l.status || ''}"`,
      `"${(l.description || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `leads_v_i_levin_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = leads.filter((l) => {
    const matchesStatus = statusFilter === 'All' || l.status === statusFilter;
    const matchesQuery =
      !searchQuery ||
      l.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.contact?.name && l.contact.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (l.contact?.telegramUsername && l.contact.telegramUsername.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesQuery;
  });

  return (
    <div className="py-12 lg:py-16 bg-navy-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-surface-border pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-gold-500 uppercase tracking-wider">
              <ShieldCheck size={16} /> Закрытый контур практики
            </div>
            <h1 className="text-3xl font-serif text-white font-bold mt-1">
              Реестр обращений и лидов
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchLeads}
              className="p-2.5 bg-navy-900 border border-surface-border text-gray-300 hover:text-white rounded text-xs flex items-center gap-1.5 transition-colors"
              title="Обновить"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              <span>Обновить</span>
            </button>

            <button
              onClick={exportCSV}
              disabled={!leads.length}
              className="px-4 py-2.5 bg-gold-500 text-navy-950 font-semibold text-xs rounded hover:bg-gold-400 transition-colors flex items-center gap-1.5"
            >
              <Download size={14} />
              <span>Экспорт в CSV</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Поиск по ID, имени, Telegram или описанию..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-navy-900 border border-surface-border text-gray-200 text-xs rounded focus:outline-none focus:border-gold-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-navy-900 border border-surface-border text-gray-200 text-xs rounded px-3 py-2 focus:outline-none focus:border-gold-500"
          >
            <option value="All">Все статусы</option>
            <option value="New">New (Новые)</option>
            <option value="Qualified">Qualified (Квалифицированы)</option>
            <option value="Consultation">Consultation (Консультация)</option>
            <option value="Contract">Contract (Договор)</option>
            <option value="In Progress">In Progress (В работе)</option>
            <option value="Completed">Completed (Завершены)</option>
            <option value="Archived">Archived (Архив)</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-navy-900 border border-surface-border rounded-xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-navy-950 border-b border-surface-border text-[11px] uppercase tracking-wider text-gray-400">
                <tr>
                  <th className="p-4">ID & Дата</th>
                  <th className="p-4">Направление / Юрисдикция</th>
                  <th className="p-4">Срочность</th>
                  <th className="p-4">Доверитель</th>
                  <th className="p-4">Описание сути</th>
                  <th className="p-4">Статус</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border/50 font-light">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-gray-500">
                      {loading ? 'Загрузка обращений...' : 'Заявок пока не поступало.'}
                    </td>
                  </tr>
                ) : (
                  filtered.map((lead) => (
                    <tr key={lead.id} className="hover:bg-navy-850/60 transition-colors">
                      <td className="p-4 whitespace-nowrap">
                        <div className="font-mono font-semibold text-gold-400">{lead.id}</div>
                        <div className="text-[10px] text-gray-500 mt-0.5">
                          {new Date(lead.createdAt).toLocaleString('ru-RU')}
                        </div>
                      </td>

                      <td className="p-4">
                        <div className="font-medium text-white">{lead.serviceCategory}</div>
                        <div className="text-[11px] text-gray-400 mt-0.5">{lead.jurisdiction}</div>
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                            lead.urgency === 'Сегодня'
                              ? 'bg-rose-950 text-rose-300 border border-rose-800/40'
                              : lead.urgency === 'В течение недели'
                              ? 'bg-amber-950 text-amber-300 border border-amber-800/40'
                              : 'bg-navy-800 text-gray-300'
                          }`}
                        >
                          {lead.urgency}
                        </span>
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        <div className="text-white font-medium">{lead.contact?.name || '—'}</div>
                        <div className="text-gold-400 text-[11px] mt-0.5">
                          {lead.contact?.telegramUsername ? `@${lead.contact.telegramUsername.replace('@', '')}` : '—'}
                        </div>
                      </td>

                      <td className="p-4 max-w-xs truncate" title={lead.description}>
                        {lead.description}
                      </td>

                      <td className="p-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-full bg-gold-500/10 text-gold-400 border border-gold-500/30 text-[10px] font-mono font-semibold uppercase">
                          {lead.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
