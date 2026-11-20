import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router'
import { departmentShopPath } from '../data/departments.js'

export default function DepartmentCard({ department }) {
  return (
    <Link
      to={departmentShopPath(department.id)}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-control transition-[border-color,box-shadow] hover:border-brand-red/40 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-red motion-reduce:transition-none"
    >
      <img
        src={department.image}
        alt=""
        width="800"
        height="500"
        loading="lazy"
        decoding="async"
        className="aspect-[8/5] w-full bg-surface object-cover"
      />
      <div className="flex flex-1 flex-col items-start gap-3 p-4 sm:p-5 lg:p-6">
        <h3 className="text-base leading-snug sm:text-lg lg:text-xl">
          {department.name}
        </h3>
        <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-brand-red group-hover:underline group-hover:underline-offset-4">
          Shop Now
          <ArrowRight aria-hidden="true" className="size-4 shrink-0" />
        </span>
      </div>
    </Link>
  )
}
