import { useState, useEffect, FormEvent } from 'react';
import { Send, FileText, CheckCircle, Database, Shield, AlertTriangle, ArrowRight, ServerCrash, Clock } from 'lucide-react';
import { ContactSubmission } from '../types';

export default function ContactConsole() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Major (Project Opportunity)');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitLog, setSubmitLog] = useState<string[]>([]);
  const [tickets, setTickets] = useState<ContactSubmission[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [newTicketId, setNewTicketId] = useState('');

  useEffect(() => {
    // Load existing tickets from local storage
    const saved = localStorage.getItem('mughis_portfolio_tickets');
    if (saved) {
      try {
        setTickets(JSON.parse(saved));
      } catch (e) {
        // Safe fail
      }
    }
  }, []);

  const saveTickets = (newTickets: ContactSubmission[]) => {
    setTickets(newTickets);
    localStorage.setItem('mughis_portfolio_tickets', JSON.stringify(newTickets));
  };

  const handleTicketSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setIsSubmitting(true);
    setSubmitLog(['Initiating secure SMTP handshake with mail-node-03...', 'Routing DNS record checks for recipient mughis01@gmail.com...']);

    const generatedIncId = `INC-${Math.floor(100000 + Math.random() * 900000)}`;
    setNewTicketId(generatedIncId);

    // Simulated deployment logging sequence
    setTimeout(() => {
      setSubmitLog((prev) => [...prev, 'Verification passed. Content payload sanitized.']);
    }, 400);

    setTimeout(() => {
      setSubmitLog((prev) => [...prev, `Provisioning new incident ticket reference: ${generatedIncId}`]);
    }, 800);

    setTimeout(() => {
      setSubmitLog((prev) => [...prev, 'Broadcasting payload message to local persistent states...']);
    }, 1200);

    setTimeout(() => {
      // Create actual ticket and store
      const newTicket: ContactSubmission = {
        id: Math.random().toString(),
        name,
        email,
        subject,
        message,
        status: 'QUEUED',
        timestamp: new Date().toLocaleString(),
        ticketId: generatedIncId
      };

      const updated = [newTicket, ...tickets];
      saveTickets(updated);

      setSubmitLog((prev) => [...prev, 'SUCCESS: Mail payload successfully dispatched to Mughis Uddin Ahmed!']);
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Clear inputs
      setName('');
      setEmail('');
      setMessage('');

      // Trigger dynamic status progression for the ticket
      progessTicketStatus(newTicket.id);
    }, 1800);
  };

  const progessTicketStatus = (ticketId: string) => {
    // Progress ticket: QUEUED -> PROVISIONING -> ROUTING -> RESOLVED
    setTimeout(() => {
      updateTicketSingleStatus(ticketId, 'PROVISIONING');
    }, 4000);

    setTimeout(() => {
      updateTicketSingleStatus(ticketId, 'ROUTING');
    }, 8000);

    setTimeout(() => {
      updateTicketSingleStatus(ticketId, 'RESOLVED');
    }, 12000);
  };

  const updateTicketSingleStatus = (id: string, status: 'QUEUED' | 'PROVISIONING' | 'ROUTING' | 'RESOLVED') => {
    setTickets((prevTickets) => {
      const updated = prevTickets.map((t) => (t.id === id ? { ...t, status } : t));
      localStorage.setItem('mughis_portfolio_tickets', JSON.stringify(updated));
      return updated;
    });
  };

  const clearTickets = () => {
    saveTickets([]);
  };

  const getSeverityBadge = (subj: string) => {
    if (subj.includes('Critical')) {
      return 'bg-red-950/40 text-red-400 border border-red-900/40';
    } else if (subj.includes('Major')) {
      return 'bg-indigo-900/40 text-indigo-400 border border-indigo-500/40';
    } else {
      return 'bg-zinc-800 text-zinc-400 border border-zinc-700';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'QUEUED':
        return 'bg-zinc-800 text-zinc-400 border border-zinc-700 animate-pulse';
      case 'PROVISIONING':
        return 'bg-amber-950/30 text-amber-400 border border-amber-900/30 animate-pulse';
      case 'ROUTING':
        return 'bg-indigo-900/30 text-indigo-400 border border-indigo-500/30 animate-pulse';
      case 'RESOLVED':
        return 'bg-emerald-950/40 text-emerald-400 border border-emerald-900/40 font-bold';
      default:
        return 'bg-zinc-800 text-zinc-500';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      {/* Contact Form - 7 Cols */}
      <div className="lg:col-span-7 bg-zinc-800/30 border border-zinc-700/50 rounded-3xl p-6 md:p-8 relative overflow-hidden backdrop-blur-md">
        <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-500/5 blur-[80px] pointer-events-none" />
        
        {/* Success View */}
        {showSuccess ? (
          <div className="flex flex-col items-center justify-center text-center py-12 space-y-6 animate-[fadeIn_0.3s_ease-out]">
            <div className="p-4 bg-emerald-950/30 border border-emerald-500/30 text-emerald-400 rounded-full glow-effect">
              <CheckCircle size={42} />
            </div>
            
            <div className="space-y-2">
              <h4 className="text-xl font-extrabold font-sans text-zinc-100">Ticket Dispatched Successfully!</h4>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                Your incident ticket <strong className="text-indigo-400 font-mono font-bold">{newTicketId}</strong> has been piped to Mughis's email hub. Keep an eye on the active incident queue dashboard!
              </p>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl font-mono text-[10px] text-emerald-400 text-left max-w-md w-full space-y-1">
              {submitLog.map((log, idx) => (
                <div key={idx}>&gt; {log}</div>
              ))}
            </div>

            <button
              onClick={() => setShowSuccess(false)}
              className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-indigo-400 hover:text-white border border-indigo-500/40 hover:border-indigo-500 bg-indigo-500/10 rounded-xl px-4 py-2 transition-all cursor-pointer"
            >
              <span>Create another ticket</span>
              <ArrowRight size={12} />
            </button>
          </div>
        ) : (
          <form onSubmit={handleTicketSubmit} className="space-y-5">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wide">Handshake Name</label>
                <input
                  type="text"
                  required
                  className="w-full bg-zinc-900 border border-zinc-700 hover:border-zinc-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 rounded-xl px-4 py-2.5 text-xs text-zinc-200 outline-none transition-all placeholder-zinc-600 font-mono"
                  placeholder="e.g., Jane Smith"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wide">SENDER_EMAIL</label>
                <input
                  type="email"
                  required
                  className="w-full bg-zinc-900 border border-zinc-700 hover:border-zinc-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 rounded-xl px-4 py-2.5 text-xs text-zinc-200 outline-none transition-all placeholder-zinc-600 font-mono"
                  placeholder="e.g., jane@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Severity Category */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wide">Inquiry Priority Severity</label>
              <select
                className="w-full bg-zinc-900 border border-zinc-700 hover:border-zinc-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 rounded-xl px-4 py-2.5 text-xs text-zinc-200 outline-none transition-all font-mono"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                disabled={isSubmitting}
              >
                <option value="Major (Project Opportunity)">Major (Project Opportunity)</option>
                <option value="Critical (Urgent Consultation)">Critical (Urgent Consultation / Contract)</option>
                <option value="Minor (Standard Question)">Minor (Standard Question / Say Hello)</option>
              </select>
            </div>

            {/* Message payload */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono text-zinc-400 uppercase tracking-wide">Message Payload Details</label>
              <textarea
                required
                rows={5}
                className="w-full bg-zinc-900 border border-zinc-700 hover:border-zinc-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 rounded-xl px-4 py-2.5 text-xs text-zinc-200 outline-none transition-all placeholder-zinc-600 font-mono resize-none leading-relaxed"
                placeholder="Briefly detail your query, architectural specifications, or open DevOps opportunities..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            {/* Simulated Live Console logs overlay */}
            {isSubmitting && (
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3.5 space-y-1 font-mono text-[9px] text-indigo-400">
                {submitLog.map((log, index) => (
                  <div key={index} className="animate-[fadeIn_0.15s_ease-out]">&gt; {log}</div>
                ))}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting || !name || !email || !message}
              className="w-full inline-flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-500 text-white font-sans font-bold text-xs py-3 rounded-xl transition-all shadow-md hover:shadow-indigo-500/20 focus:ring-2 focus:ring-indigo-500/40 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-1" />
                  <span>TRANSMITTING MESSAGE PAYLOAD...</span>
                </>
              ) : (
                <>
                  <Send size={14} />
                  <span>DISPATCH INCIDENT TICKET</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>

      {/* Live Incident Queue Dashboard - 5 Cols */}
      <div className="lg:col-span-5 bg-zinc-950 border border-zinc-800 rounded-3xl p-5 md:p-6 shadow-xl flex flex-col justify-between min-h-[440px] relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[80px] pointer-events-none" />
        
        {/* Header */}
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1.5 text-xs font-mono font-bold text-indigo-400">
              <Database size={12} />
              <span>LIVE INCIDENT QUEUE</span>
            </div>
            {tickets.length > 0 && (
              <button
                onClick={clearTickets}
                className="text-[10px] text-zinc-500 hover:text-red-400 font-mono transition-all cursor-pointer"
              >
                Clear Queue
              </button>
            )}
          </div>
          <h4 className="text-sm font-extrabold text-zinc-200 mt-1 font-sans">Dispatcher Console Logs</h4>
          <p className="text-[11px] text-zinc-500 leading-normal mt-1">
            Audit logs matching active ticket handshakes. Your submitted inquiry displays in real-time here.
          </p>
        </div>

        {/* Tickets Scroll Container */}
        <div className="flex-1 my-5 overflow-y-auto max-h-[260px] space-y-3 pr-1 scrollbar">
          {tickets.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-10 text-zinc-600 space-y-2 select-none h-full">
              <Clock size={24} className="text-zinc-700" />
              <div className="text-xs font-mono font-bold">Queue Empty</div>
              <p className="text-[10px] max-w-xs leading-normal">
                No active incident records found in local storage. Dispatch a ticket using the form on the left!
              </p>
            </div>
          ) : (
            tickets.map((t) => (
              <div
                key={t.id}
                className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-2xl p-4 space-y-2 transition-all font-mono text-[10px]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-indigo-400 font-bold">{t.ticketId}</span>
                    <span className="text-zinc-600">|</span>
                    <span className="text-zinc-500 text-[9px]">{t.timestamp}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[8px] uppercase tracking-wider font-semibold ${getStatusBadge(t.status)}`}>
                    {t.status}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5 max-w-[70%]">
                    <span className="text-zinc-300 font-bold block truncate">{t.name}</span>
                    <span className="text-zinc-500 text-[9px] block truncate">{t.email}</span>
                  </div>
                  <span className={`px-1.5 py-0.5 rounded text-[8px] uppercase whitespace-nowrap self-start ${getSeverityBadge(t.subject)}`}>
                    {t.subject.split(' ')[0]}
                  </span>
                </div>

                <div className="border-t border-zinc-800 pt-2 text-[10px] text-zinc-400 leading-normal line-clamp-2 italic">
                  "{t.message}"
                </div>
              </div>
            ))
          )}
        </div>

        {/* Security Banner Footer */}
        <div className="border-t border-zinc-800 pt-3 flex items-center justify-between text-[9px] font-mono text-zinc-500 select-none tracking-widest uppercase">
          <span className="flex items-center">
            <Shield size={10} className="mr-1 text-indigo-400" />
            <span>ENCRYPTED IN TRANSIT (TLS)</span>
          </span>
          <span className="text-right">DB_PERSISTENCE: LOCAL_STATE</span>
        </div>

      </div>
    </div>
  );
}
