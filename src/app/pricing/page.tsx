"use client";

export default function PricingPage() {
  const plans = [
    {
      name: "Quick Clip",
      price: "$4",
      duration: "1 month",
      searches: "100 searches",
      saves: "save 10 clips",
      recommended: false,
    },
    {
      name: "Clip Crafter",
      price: "$7",
      duration: "3 months",
      searches: "500 searches",
      saves: "save 30 clips",
      recommended: true,
    },
    {
      name: "Snip Master",
      price: "$11",
      duration: "6 months",
      searches: "unlimited searches",
      saves: "unlimited saves",
      recommended: false,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Subtle dot pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40 -z-10"></div>
      {/* Animated background blobs */}
      <div className="absolute top-[-150px] left-[-100px] w-[500px] h-[500px] bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse -z-10"></div>
      <div className="absolute bottom-[-120px] right-[-80px] w-[400px] h-[400px] bg-gradient-to-br from-indigo-600/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000 -z-10"></div>
      <div className="absolute top-[20%] right-[15%] w-[300px] h-[300px] bg-gradient-to-br from-cyan-600/15 to-blue-600/15 rounded-full blur-2xl animate-pulse delay-500 -z-10"></div>

      <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-4 text-center">Choose Your Plan</h1>
      <p className="text-gray-400 mb-10 text-center max-w-xl">Unlock more searches and save your favorite clips. Simple, transparent pricing. No hidden fees.</p>
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => (
          <div
            key={plan.name}
            className={`relative flex flex-col items-center bg-[#232946] rounded-2xl shadow-xl border border-gray-800 px-7 py-10 transition-transform duration-200 hover:scale-[1.025] ${
              plan.recommended
                ? "border-2 border-pink-500 shadow-pink-500/20 z-10"
                : ""
            }`}
          >
            {plan.recommended && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-pink-500 text-white text-xs font-semibold px-4 py-1 rounded-full shadow-md tracking-wide">Recommended</span>
            )}
            <h2 className="text-xl font-bold text-white mb-2">{plan.name}</h2>
            <div className="flex items-end mb-4">
              <span className="text-3xl font-extrabold text-white">{plan.price}</span>
              <span className="text-base text-gray-400 ml-2 font-medium">/ {plan.duration}</span>
            </div>
            <ul className="mb-8 space-y-2 text-gray-300 text-sm text-center">
              <li>{plan.searches}</li>
              <li>{plan.saves}</li>
            </ul>
            <button
              className={`w-full py-2 rounded-full font-semibold transition-all duration-200 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 ${
                plan.recommended
                  ? "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
                  : "bg-zinc-800 hover:bg-zinc-700"
              }`}
            >
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 