import TrackingInput from "./tracking-input";

const TrackSection = () => {
  return (
    <section id="track" className="py-10">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold  mb-4 text-primary">
            Track Your Shipment
          </h1>
          <p className="text-lg text-muted-foreground px-2">
            Get real-time updates on your package location and delivery status
          </p>
        </div>

        <TrackingInput className="max-w-3xl mx-auto px-4" />
      </div>
    </section>
  );
};

export default TrackSection;
