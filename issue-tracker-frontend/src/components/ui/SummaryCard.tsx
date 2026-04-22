const colorMap: Record<string, string> = {
  blue: "text-blue-600 bg-blue-100 border-blue-300",
  orange: "text-orange-600 bg-orange-100 border-orange-300",
  green: "text-green-600 bg-green-100 border-green-300",
};

interface SummaryCardProps {
    title: string;
    description: string;
    value: number;
    mainColor: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
}

const SummaryCard = ({
    title, 
    description,
    value,
    mainColor,
    icon: Icon,
}: SummaryCardProps) => {
    const styles = colorMap[mainColor];
    return (
        <div
        className={`bg-card w-full p-6 rounded-xl border transition-shadow hover:bg-gray-50 overflow-hidden shadow-sm`}
        >
            <div className="flex items-start justify-between gap-3 px-2 py-4">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <p className={`text-4xl font-bold mt-2 ${styles.split(" ")[0]}`}>
                        {value ?? "-"}
                    </p>
                </div>
                <div
                    className={`h-14 w-14 rounded-xl flex items-center justify-center border ${styles.split(" ")[1]} ${styles.split(" ")[2]}`}
                >
                    <Icon className={`h-8 w-8 ${styles.split(" ")[0]}`}/>
                </div>
            </div>
            <p className="text-sm text-muted-foreground px-2">{description}</p>
        </div>
    )
}

export default SummaryCard
