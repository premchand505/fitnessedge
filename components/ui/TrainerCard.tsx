'use client';

import Image from 'next/image';
import { motion, Variants } from 'framer-motion';

const cardVariants: Variants = {
  initial: { filter: 'grayscale(0%)', scale: 1 },
  hover: {
    filter: 'grayscale(0%)',
    scale: 1.05,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
};

const nameVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  hover: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut', delay: 0.1 },
  },
};

interface TrainerCardProps {
  name: string;
  specialty: string;
  imageSrc: string;
}

const TrainerCard: React.FC<TrainerCardProps> = ({
  name,
  specialty,
  imageSrc,
}) => {
  return (
    <motion.div
      className="relative h-80 w-64 flex shrink-0 overflow-hidden rounded-lg shadow-lg"
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
    >
      <Image
        src={imageSrc}
        alt={`Headshot of trainer ${name}`}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      <motion.div
        className="absolute bottom-0 left-0 w-full bg-linear-to-t from-black-950 to-transparent p-4"
        variants={nameVariants}
      >
        <h3 className="font-heading text-2xl uppercase text-white">{name}</h3>
        <p className="text-sm  text-white font-medium ">{specialty}</p>
      </motion.div>
    </motion.div>
  );
};

export default TrainerCard;