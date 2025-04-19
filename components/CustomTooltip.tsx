const CustomTooltip = ({ active, payload, label }:any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white shadow-lg rounded p-3 border text-sm">
                <p className="font-semibold mb-2">{label}</p>
                <div className="flex flex-col gap-1">
                    {payload.map((entry:any, index:any) => {
                        const isThisWeek = entry.dataKey === 'pv';
                        return (
                            <div key={index} className="flex items-center gap-2">
                                <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: entry.color }}
                                ></div>
                                <p className="text-gray-700">
                                    {isThisWeek ? 'This Week' : 'Last Week'}: {entry.value}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    return null;
};
