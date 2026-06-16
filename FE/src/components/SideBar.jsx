import { useState } from 'react';
import { Menu, Leaf, History, ChevronLeft, Scan } from 'lucide-react';

export default function Sidebar({ history, activeTab, setActiveTab, onSelectCatalog }) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <aside 
      className={`bg-brand-gray border-r border-gray-800 transition-all duration-300 ease-in-out flex flex-col ${
        isExpanded ? 'w-72' : 'w-20'
      } h-screen sticky top-0`}
    >
      {/* Header Sidebar */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
        <div className={`flex items-center gap-3 overflow-hidden whitespace-nowrap transition-opacity ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'}`}>
          <Leaf className="text-brand-teal shrink-0" size={24} />
          <span className="font-bold text-white text-lg tracking-wide">Fruit AI</span>
        </div>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-2 text-gray-400 hover:text-brand-teal hover:bg-black/50 rounded-lg transition-colors"
        >
          {isExpanded ? <ChevronLeft size={20} /> : <Menu size={24} className="text-brand-teal" />}
        </button>
      </div>

      {/* Menu Điều Hướng Chính */}
      <div className="p-4 border-b border-gray-800 space-y-1">
        <button
          onClick={() => setActiveTab('scan')}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl font-medium transition-all ${
            activeTab === 'scan' 
              ? 'bg-brand-teal/10 text-brand-teal border border-brand-teal/30' 
              : 'text-gray-400 hover:text-white hover:bg-brand-dark/50'
          } ${!isExpanded && 'justify-center'}`}
        >
          <Scan size={20} />
          {isExpanded && <span>Nhận diện ảnh</span>}
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl font-medium transition-all ${
            activeTab === 'history' 
              ? 'bg-brand-teal/10 text-brand-teal border border-brand-teal/30' 
              : 'text-gray-400 hover:text-white hover:bg-brand-dark/50'
          } ${!isExpanded && 'justify-center'}`}
        >
          <History size={20} />
          {isExpanded && <span>Lịch sử chi tiết</span>}
        </button>
      </div>

      {/* Danh sách rút gọn ở dưới */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className={`flex items-center gap-2 text-gray-400 mb-4 ${!isExpanded && 'justify-center'}`}>
          <History size={16} className="shrink-0" />
          {isExpanded && <span className="font-semibold text-xs uppercase tracking-wider">Mới quét gần đây</span>}
        </div>

        {history.length === 0 ? (
          isExpanded && <p className="text-gray-500 text-sm text-center mt-4">Chưa có dữ liệu</p>
        ) : (
          <ul className="space-y-3">
            {history.slice(0, 4).map((item, index) => {
              const displayName = `${item.name || "Không rõ"} ${item.isGreen ? "Xanh" : "Chín"}`;
              const statusColor = item.isGreen ? "text-green-400" : "text-yellow-500";
              const barColor = item.isGreen ? "bg-green-400" : "bg-yellow-500";

              return (
                <li 
                  key={index} 
                  className="p-3 bg-brand-dark rounded-xl border border-gray-800 hover:border-brand-teal/30 transition-colors cursor-pointer active:scale-[0.98]"
                  onClick={() => {
                    setActiveTab('history');
                    onSelectCatalog(item.id); // Kích hoạt hiệu ứng định vị chi tiết
                  }}
                >
                  {isExpanded ? (
                    <>
                      <div className="flex justify-between items-start mb-1.5">
                        <span className="font-medium text-gray-300 text-sm truncate max-w-[130px] capitalize">
                          {displayName}
                        </span>
                        <span className={`text-xs font-mono ${statusColor}`}>
                          {item.confidence?.toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-1 overflow-hidden">
                        <div className={`${barColor} h-1 rounded-full`} style={{ width: `${item.confidence}%` }}></div>
                      </div>
                    </>
                  ) : (
                    <div className={`flex justify-center font-semibold text-xs ${statusColor}`} title={displayName}>
                      {item.confidence?.toFixed(0)}%
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </aside>
  );
}