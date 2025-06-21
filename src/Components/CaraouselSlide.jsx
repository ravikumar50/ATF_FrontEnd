import CarouselCard from "./CarouselCard";

function CarouselSlide({ items, slideNumber, totalSlides, currentSlide, setCurrentSlide }) {
  if (slideNumber !== currentSlide) return null;

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  return (
    <div className="carousel-item relative w-full flex justify-center gap-4">
      {items.map((item, index) => (
        <CarouselCard key={index} {...item} />
      ))}

      <div className="absolute top-1/2 -translate-y-1/2 transform w-full flex justify-between px-6">
        <button onClick={handlePrev} className="btn btn-circle -ml-10">❮</button>
        <button onClick={handleNext} className="btn btn-circle -mr-10">❯</button>
      </div>
    </div>
  );
}

export default CarouselSlide;
