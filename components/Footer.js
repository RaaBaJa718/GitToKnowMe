import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
    return (
        <motion.footer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-gray-800 text-white p-4 text-center"
        >
            <p>© {new Date().getFullYear()} GitToKnowMe. All Rights Reserved.</p>
            <div className="mt-2">
                <Link href="/about">
                    <motion.span whileHover={{ scale: 1.1 }} className="underline cursor-pointer">
                        About Us
                    </motion.span>
                </Link>
            </div>
        </motion.footer>
    );
}