import { File } from 'lucide-react'

interface NoResultCardProps {
    title: string;
    description: string;
}

const NoResultCard = ({
    title,
    description,
}: NoResultCardProps) => {
    return (
        <div className="bg-card rounded-xl border border-panel-border shadow-sm p-12 text-center">
            <File
                className="mx-auto text-muted-foreground mb-4"
                size={48}
            />
            <h3 className="text-lg font-semibold text-foreground mb-2">
                {title}
            </h3>
            <p className="text-muted-foreground mb-4">
                {description}
            </p>
        </div>
    )
}

export default NoResultCard
