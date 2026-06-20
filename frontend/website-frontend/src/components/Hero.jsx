import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white flex flex-col justify-center items-center">

      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-7xl font-bold"
      >
        Atharva Bhaskar
      </motion.h1>

      <p className="mt-6 text-2xl text-gray-400">
        Singer | Composer | Performer
      </p>

      <div className="mt-10 flex gap-5">

        <button className="bg-yellow-400 text-black px-8 py-4 rounded-full font-bold">
          Listen Now
        </button>

        <button className="border border-white px-8 py-4 rounded-full">
          Watch Videos
        </button>

      </div>

    </section>
  );
};

export default Hero;