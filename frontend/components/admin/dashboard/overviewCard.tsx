import { motion } from "framer-motion";

interface Props {
  title: string;

  value: number | string;
}

export default function OverviewCard({
  title,
  value,
}: Props) {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      transition={{
        duration: 0.2,
      }}
      className="
        rounded-2xl
        bg-white
        p-6
        shadow-sm
      "
    >
      <p className="text-gray-500">{title}</p>

      <h2
        className="
          mt-2
          text-3xl
          font-bold
          text-gray-800
        "
      >
        {value}
      </h2>
    </motion.div>
  );
}
