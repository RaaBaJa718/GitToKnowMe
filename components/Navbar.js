import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Navbar() {
    return (
        <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="p-4 bg-gray-900 text-white flex justify-between"
        >
            <h1 className="text-lg font-bold">GitToKnowMe</h1>
            <div className="space-x-4">
                <Link href="/">Home</Link>
                <Link href="/projects">Projects</Link>
                <Link href="/about">About</Link>
            </div>
        </motion.nav>
    );
}