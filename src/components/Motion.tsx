import { motion } from 'framer-motion';

const EmptyState = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full"
        >
            <motion.h2
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 100 }}
                className="text-2xl font-bold"
            >
                No tasks available
            </motion.h2>
            <motion.p
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ type: 'spring', stiffness: 100 }}
                className="text-gray-500"
            >
                Add a new task to get started!
            </motion.p>
        </motion.div>
    );
};

export default EmptyState;
