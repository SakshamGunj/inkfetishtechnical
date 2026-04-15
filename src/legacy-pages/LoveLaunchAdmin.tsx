import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Calendar, Clock, Users, Loader2 } from 'lucide-react';

interface PollVote {
    id: string;
    date: string;
    time: string;
    createdAt: any;
}

const LoveLaunchAdmin = () => {
    const [votes, setVotes] = useState<PollVote[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVotes = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "love_launch_poll"));
                const fetchedVotes: PollVote[] = [];
                querySnapshot.forEach((doc) => {
                    fetchedVotes.push({ id: doc.id, ...doc.data() } as PollVote);
                });
                setVotes(fetchedVotes);
            } catch (error) {
                console.error("Error fetching votes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVotes();
    }, []);

    // Process Data
    const totalVotes = votes.length;

    const dateCounts = votes.reduce((acc, vote) => {
        acc[vote.date] = (acc[vote.date] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const dateData = Object.keys(dateCounts).map(date => ({
        name: date,
        votes: dateCounts[date]
    })).sort((a, b) => b.votes - a.votes);

    const timeCounts = votes.reduce((acc, vote) => {
        acc[vote.time] = (acc[vote.time] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const timeData = Object.keys(timeCounts).map(time => ({
        name: time,
        value: timeCounts[time]
    }));

    const COLORS = ['#0891b2', '#22d3ee', '#06b6d4', '#67e8f9'];

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-cyan-500">
                <Loader2 className="w-10 h-10 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 p-8 font-sans">
            <Helmet>
                <title>Poll Results | Login Admin</title>
            </Helmet>

            <div className="max-w-7xl mx-auto space-y-8">
                <header className="mb-12">
                    <h1 className="text-3xl font-bold text-white mb-2">Love Launch Poll Results</h1>
                    <p className="text-slate-400">Real-time voting analytics</p>
                </header>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <MetricCard
                        title="Total Votes"
                        value={totalVotes}
                        icon={<Users className="w-6 h-6 text-cyan-400" />}
                    />
                    <MetricCard
                        title="Top Date"
                        value={dateData.length > 0 ? dateData[0].name : "N/A"}
                        subtext={`${dateData.length > 0 ? dateData[0].votes : 0} votes`}
                        icon={<Calendar className="w-6 h-6 text-purple-400" />}
                    />
                    <MetricCard
                        title="Top Time"
                        value={timeData.length > 0 ? timeData.sort((a, b) => b.value - a.value)[0].name : "N/A"}
                        subtext={`${timeData.length > 0 ? timeData.sort((a, b) => b.value - a.value)[0].value : 0} votes`}
                        icon={<Clock className="w-6 h-6 text-emerald-400" />}
                    />
                </div>

                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Date Chart */}
                    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-cyan-400" />
                            Votes by Date
                        </h2>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={dateData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                    <XAxis dataKey="name" stroke="#94a3b8" />
                                    <YAxis stroke="#94a3b8" />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                                        itemStyle={{ color: '#22d3ee' }}
                                    />
                                    <Bar dataKey="votes" fill="#0891b2" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Time Chart */}
                    <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
                        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-emerald-400" />
                            Votes by Time
                        </h2>
                        <div className="h-[300px] flex items-center justify-center">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={timeData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {timeData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                                    />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Raw List (Optional - useful for quick checks) */}
                <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
                    <h2 className="text-xl font-bold text-white mb-6">Recent Votes</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-slate-400">
                            <thead className="text-xs uppercase bg-slate-800/50 text-slate-300">
                                <tr>
                                    <th className="px-4 py-3 rounded-l-lg">Date</th>
                                    <th className="px-4 py-3">Time</th>
                                    <th className="px-4 py-3 rounded-r-lg">Recorded At</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {votes.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0)).slice(0, 10).map((vote) => (
                                    <tr key={vote.id} className="hover:bg-slate-800/30 transition-colors">
                                        <td className="px-4 py-3 font-medium text-white">{vote.date}</td>
                                        <td className="px-4 py-3">{vote.time}</td>
                                        <td className="px-4 py-3">
                                            {vote.createdAt ? new Date(vote.createdAt.seconds * 1000).toLocaleString() : 'Just now'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

const MetricCard = ({ title, value, subtext, icon }: { title: string, value: string | number, subtext?: string, icon: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl flex items-center gap-4"
    >
        <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
            {icon}
        </div>
        <div>
            <p className="text-slate-400 text-sm font-medium">{title}</p>
            <h3 className="text-2xl font-bold text-white">{value}</h3>
            {subtext && <p className="text-xs text-slate-500 mt-1">{subtext}</p>}
        </div>
    </motion.div>
);

export default LoveLaunchAdmin;
