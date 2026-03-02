function VideoSection() {
  return (
    <section className="relative bg-[#01070f] py-20 px-3 sm:px-10 lg:px-20 overflow-hidden" style={{ borderRadius: '0 20rem 20rem 0' }}>

      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">

        <div
          className="overflow-hidden shadow-2xl border-4 border-white/10 h-[400px] md:h-[500px] max-w-4xl flex-shrink-0"
          style={{ borderRadius: '1.5rem 15rem 15rem 1.5rem' }}
        >
          <video
            src="https://vaani-storage.s3.eu-north-1.amazonaws.com/assets/animation.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 text-white">
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            "Your voice deserves more than a complaint <br/>- it deserves a solution"
          </h3>
        </div>

      </div>
    </section>
  )
}

export default VideoSection