import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="p-4 bg-gray-900 text-white flex justify-between">
            <h1 className="text-lg font-bold">GitToKnowMe</h1>
            <div className="space-x-4">
                <Link href="/">Home</Link>
                <Link href="/projects">Projects</Link>
                <Link href="/about">About</Link>
            </div>
        </nav>
    );
}