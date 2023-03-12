import { Area, CartesianGrid, ComposedChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

const data = [
    {
        name: 'Jan',
        uv: 3000,
        pv: 3700,
        amt: 2400,
    },
    {
        name: 'Feb',
        uv: 3000,
        pv: 3398,
        amt: 2210,
    },
    {
        name: 'Mar',
        uv: 2000,
        pv: 3800,
        amt: 2290,
    },
    {
        name: 'Apr',
        uv: 2780,
        pv: 3208,
        amt: 2000,
    },
    {
        name: 'May',
        uv: 1890,
        pv: 3000,
        amt: 2181,
    },
    {
        name: 'Jun',
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: 'Aug',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
    {
        name: 'Sep',
        uv: 2490,
        pv: 2900,
        amt: 2100,
    },
    {
        name: 'Oct',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
    {
        name: 'Nov',
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
    {
        name: 'Dec',
        uv: 1490,
        pv: 2900,
        amt: 2100,
    },
];
const Chart = () => {
    return (
        <ResponsiveContainer minHeight={340}>
            <ComposedChart data={data} margin={{ top: 25, right: 20, left: 20, bottom: 5 }}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#027A48" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
                    </linearGradient>
                </defs>
                <defs>
                    <linearGradient id="color2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#12B76A" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0.1} />
                    </linearGradient>
                </defs>
                <XAxis
                    style={{ fontSize: '12px', color: '#475467', fontWeight: '400' }}
                    tickLine={false}
                    dataKey="name"
                />
                <Tooltip />
                <CartesianGrid vertical={false} stroke="#F2F4F7" />

                <Area
                    stroke="#027A48"
                    type="monotone"
                    dataKey="pv"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#color2)"
                />
                <Area
                    type="monotone"
                    dataKey="uv"
                    stroke="#12B76A"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorUv)"
                />
            </ComposedChart>
        </ResponsiveContainer>
    );
};

export default Chart;
