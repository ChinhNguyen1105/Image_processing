import { History } from 'lucide-react';

export default function HistoryList({ history }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-brand-accent h-full">
      <div className="flex items-center gap-2 mb-6 text-brand-primary">
        <History size={24} />
        <h2 className="text-xl font-bold">Lịch sử phân tích</h2>
      </div>
      
      {history.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-4">Chưa có dữ liệu.</p>
      ) : (
        <ul className="space-y-3">
          {history.map((item, index) => (
            <li key={index} className="flex justify-between items-center p-3 bg-brand-light rounded-lg text-brand-secondary hover:bg-brand-accent transition-colors cursor-default">
              <span className="font-semibold">{item.fruit}</span>
              <span className="text-sm bg-white px-2 py-1 rounded-md shadow-sm">
                {item.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}