import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from "recharts";

interface ChartData {

    name: string;

    value: number;

}

interface Props {

    data: ChartData[];

}

const COLORS = [

    "#0d6efd",

    "#198754",

    "#ffc107",

    "#dc3545",

    "#6f42c1",

    "#20c997",

];

const DashboardChart = ({
    data,
}: Props) => {

    return (

        <div
            className="card shadow mt-4"
        >

            <div
                className="card-body"
            >

                <h4
                    className="mb-4 text-center"
                >

                    Employees by Department

                </h4>

                <ResponsiveContainer
                    width="100%"
                    height={350}
                >

                    <PieChart>

                        <Pie

                            data={data}

                            dataKey="value"

                            nameKey="name"

                            outerRadius={120}

                            label

                        >

                            {

                                data.map(

                                    (

                                        _,

                                        index

                                    ) => (

                                        <Cell

                                            key={index}

                                            fill={
                                                COLORS[
                                                index %
                                                COLORS.length
                                                ]
                                            }

                                        />

                                    )

                                )

                            }

                        </Pie>

                        <Tooltip />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

};

export default DashboardChart;