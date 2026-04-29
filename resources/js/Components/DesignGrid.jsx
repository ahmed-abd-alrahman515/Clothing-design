import DesignCard from './DesignCard';

export default function DesignGrid({ designs = [], type = 'free' }) {
    if (!designs.length) return null;

    const gridCols = designs.length <= 3
        ? 'grid-cols-1 sm:grid-cols-3'
        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

    return (
        <div className={`grid gap-4 ${gridCols}`}>
            {designs.map((design, i) => (
                <DesignCard
                    key={design.id}
                    design={design}
                    type={type}
                    index={i}
                />
            ))}
        </div>
    );
}
