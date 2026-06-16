import { CheckCircle2, AlertTriangle, Info } from 'lucide-react';

export default function PredictionResult({ result, fruitMapping }) {
  if (!result) return null;

  // Xử lý dữ liệu từ API
  const fruitName = fruitMapping[result.fruit] || result.fruit || "Không xác định";
  const greenConf = parseFloat(result.green_confidence || 0);
  const ripeConf = parseFloat(result.ripe_confidence || 0);
  
  // Logic quyết định kết luận
  const isGreen = greenConf > ripeConf;
  const finalStatus = isGreen ? "Xanh (Chưa chín)" : "Đã chín";
  const finalConfidence = isGreen ? greenConf : ripeConf;

  return (
    <div className="bg-brand-gray/50 border border-brand-teal/30 p-8 rounded-3xl shadow-xl flex flex-col h-full animate-fade-in relative overflow-hidden">
      {/* Vệt sáng trang trí góc */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-teal/10 rounded-full blur-3xl"></div>

      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-brand-dark/80 rounded-full shrink-0 shadow-inner">
          <CheckCircle2 size={32} className="text-brand-teal" />
        </div>
        <h3 className="text-2xl font-bold text-white tracking-wide">Kết quả từ mô hình</h3>
      </div>
      
      <div className="space-y-6 flex-1">
        
        {/* Kết luận phân loại nổi bật */}
        <div className="bg-brand-dark/80 p-6 rounded-2xl border border-brand-teal/40 relative overflow-hidden">
          <div className="absolute left-0 top-0 w-1.5 h-full bg-brand-teal"></div>
          <p className="text-gray-400 text-sm mb-1 font-medium flex items-center gap-2">
            <Info size={16} className="text-brand-teal"/> Kết luận phân loại:
          </p>
          <p className="text-lg text-gray-200 mt-2 leading-relaxed">
            Dựa vào phân tích, đây là quả <span className="font-bold text-brand-teal text-xl capitalize">{fruitName}</span> đang ở trạng thái <span className="font-bold text-white text-xl">{finalStatus}</span>.
          </p>
        </div>

        {/* Trực quan hóa mức độ tự tin */}
        <div className="bg-brand-dark/40 p-6 rounded-2xl border border-gray-800 space-y-5">
          <p className="text-gray-400 text-sm font-medium mb-2">Chi tiết độ tin cậy của mô hình:</p>
          
          {/* Thanh trạng thái Xanh */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-300 font-medium">Khả năng Xanh</span>
              <span className="text-green-400 font-mono bg-green-400/10 px-2 py-0.5 rounded">
                {greenConf.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-black rounded-full h-3 overflow-hidden border border-gray-800 shadow-inner">
              <div 
                className="bg-gradient-to-r from-green-600 to-green-400 h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${greenConf}%` }}
              ></div>
            </div>
          </div>

          {/* Thanh trạng thái Chín */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-300 font-medium">Khả năng Chín</span>
              <span className="text-yellow-500 font-mono bg-yellow-500/10 px-2 py-0.5 rounded">
                {ripeConf.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-black rounded-full h-3 overflow-hidden border border-gray-800 shadow-inner">
              <div 
                className="bg-gradient-to-r from-yellow-600 to-yellow-400 h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${ripeConf}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Lời khuyên nếu tổng độ tự tin thấp */}
        {finalConfidence < 60 && (
          <div className="flex items-start gap-3 text-yellow-500/90 bg-yellow-500/10 p-5 rounded-2xl text-sm border border-yellow-500/20 leading-relaxed mt-auto">
            <AlertTriangle size={24} className="shrink-0 mt-0.5" />
            <p>Hình ảnh có vẻ hơi khó nhìn. Chỉ số nhận diện chưa cao, bạn thử chụp lại góc khác rõ sáng hơn xem sao nhé!</p>
          </div>
        )}
      </div>
    </div>
  );
}