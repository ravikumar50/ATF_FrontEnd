function CarouselCard({ name, count, icon, color }) {
  return (
    <div className="flex flex-col items-center justify-center p-5 gap-1 rounded-md shadow-2xl bg-gray-700 text-white w-40 h-30">
      <div className="text-2xl" style={{ color }}>{icon}</div>
      <p className="text-xl font-semibold">{name}</p>
      <h3 className="text-3xl font-bold">{count}</h3>
    </div>
  );
}

export default CarouselCard;
