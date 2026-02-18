function ComingSoonCard({ movie }) {
  return (
    <div className="group relative">

      <div className="
        relative
        overflow-hidden
        rounded-2xl
        bg-slate-900/50
        backdrop-blur-md
        border border-white/5
        shadow-lg
        transition duration-500
        hover:-translate-y-2
        hover:shadow-2xl
      ">
        <div className="
  absolute top-4 left-4
  px-3 py-1
  text-xs
  bg-white/10
  backdrop-blur-md
  border border-white/10
  rounded-full
  text-gray-200
">
  Upcoming
</div>

        {/* Poster */}
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full aspect-[2/3] object-cover opacity-90 group-hover:opacity-100 transition duration-500"
        />

        {/* Bottom Fade */}
        <div className="
          absolute inset-x-0 bottom-0
          h-28
          bg-gradient-to-t
          from-black/90
          via-black/50
          to-transparent
        " />

        {/* Info */}
        <div className="
          absolute bottom-4 left-4 right-4
          text-white
        ">
          <h3 className="text-lg font-semibold tracking-tight">
            {movie.title}
          </h3>

          <p className="text-sm text-gray-300 mt-1">
            Releasing {movie.release_date}
          </p>
        </div>

      </div>
    </div>
  );
}

export default ComingSoonCard;
