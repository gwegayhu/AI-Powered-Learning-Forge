import Link from "next/link";

const Navigation = () => (
  <nav className="flex items-center justify-between px-8 py-4 bg-white shadow">
    <div className="text-2xl font-bold text-blue-600">Learning Forge</div>
    <div className="flex space-x-6">
      <Link href="/">Home</Link>
      <Link href="/courses">Courses</Link>
      <Link href="/about">About</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/signin" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Sign In</Link>
    </div>
  </nav>
);

export default Navigation;