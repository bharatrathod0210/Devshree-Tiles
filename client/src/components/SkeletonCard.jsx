import { useTheme } from '../context/ThemeContext';

export default function SkeletonCard() {
  const { dark } = useTheme();
  return (
    <div className={`rounded-2xl overflow-hidden ${dark ? 'bg-[#161616]' : 'bg-white'}`}>
      <div className="skeleton aspect-[4/3] w-full" />
      <div className="p-4 space-y-3">
        <div className={`skeleton h-4 rounded w-3/4`} />
        <div className="flex gap-2">
          <div className="skeleton h-3 rounded w-16" />
          <div className="skeleton h-3 rounded w-16" />
        </div>
        <div className="skeleton h-9 rounded-xl w-full" />
      </div>
    </div>
  );
}
