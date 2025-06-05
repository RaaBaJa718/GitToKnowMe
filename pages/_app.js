import { motion } from 'framer-motion';

export default function MyApp({ Component, pageProps }) {
    return (
        <motion.div
            key={Component.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7 }}
        >
            <Component {...pageProps} />
        </motion.div>
    );
}