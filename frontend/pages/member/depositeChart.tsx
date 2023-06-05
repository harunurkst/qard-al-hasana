import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const DepositChart = (props) => {
    const data = [
        {
            name: 'Jan',
            week1: 20,
            week2: 50,
            week3: 100,
            week4: 30,
        },
        {
            name: 'Feb',
            week1: 20,
            week2: 80,
            week3: 100,
            week4: 30,
        },
        {
            name: 'Mar',
            week1: 20,
            week2: 50,
            week3: 100,
            week4: 30,
        },
        {
            name: 'Apr',
            week1: 20,
            week2: 50,
            week3: 100,
            week4: 30,
        },
        {
            name: 'May',
            week1: 20,
            week2: 50,
            week3: 100,
            week4: 30,
        },
        {
            name: 'Jun',
            week1: 20,
            week2: 50,
            week3: 100,
            week4: 30,
        },
        {
            name: 'Jul',
            week1: 20,
            week2: 50,
            week3: 100,
            week4: 30,
        },
        {
            name: 'Aug',
            week1: 20,
            week2: 50,
            week3: 100,
            week4: 30,
        },
        {
            name: 'Sep',
            week1: 20,
            week2: 40,
            week3: 100,
            week4: 30,
        },
        {
            name: 'Oct',
            week1: 20,
            week2: 50,
            week3: 100,
            week4: 30,
        },
        {
            name: 'Nov',
            week1: 20,
            week2: 50,
            week3: 70,
            week4: 30,
        },
        {
            name: 'Dec',
            week1: 20,
            week2: 50,
            week3: 100,
            week4: 30,
        },
    ];
    return (
        <>
            <ResponsiveContainer>
                <BarChart className=" w bg-white" data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickSize={10} domain={[0, 100]} type="number" tickCount={10} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="week1" fill="#3898DB" shape={props.shape} />
                    <Bar dataKey="week2" fill="#76CE72" shape={props.shape} />
                    <Bar dataKey="week3" fill="#9B5AB6" shape={props.shape} />
                    <Bar dataKey="week4" fill="#F1C40F" shape={props.shape} />
                </BarChart>
            </ResponsiveContainer>
        </>
    );
};

export default DepositChart;
